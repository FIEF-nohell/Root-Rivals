import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { AuthService } from './auth.service';

interface Plant {
  name: string;
  owner: string;                // username
  uid: string;
  water: number;                // 0 - 100
  born: number;                 // timestamp
  lastWatered: number;          // timestamp
  lastDrought: number | null;   // timestamp or none
  defense: number;
  damage: number;
  experience: number;           // 0 - 100, scales up
  wins: number;
  losses: number;
  plantType: string;            // Desert, Tropical, Mediteran
  health: number;               // 0 - 100
  waterInterval: number,        // in minutes
  perfectTimeframe: number[],
  level: number,
  canBeWatered: boolean,        // water level is below 120
  needsWater: boolean,          // water level is below 60
  plantScore: number,
}

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private afAuth: AngularFireAuth, private auth: AuthService, private db: AngularFirestore, private alertController: AlertController) { }

  public plant: any = [];

  async createPlant(type: string = "Mediteran") {
    try {
      const user = await this.afAuth.currentUser;
      let totalTimeframe = 300
      let atck = 10
      let def = 5
      switch (type) {
        case "Desert":
          totalTimeframe = totalTimeframe * 1.5
          atck = 10
          def = 8
          break
        case "Tropical":
          totalTimeframe = totalTimeframe * 0.5
          atck = 12
          def = 3
          break
      }
      const newPlant: Plant = {
        name: user!.displayName! + "'s Plant",
        owner: user!.displayName!,
        uid: user!.uid!,
        water: 100,
        lastWatered: Date.now(),
        born: Date.now(),
        lastDrought: null,
        defense: def,
        plantType: type,
        damage: atck,
        experience: 0,
        wins: 0,
        losses: 0,
        health: 100,
        waterInterval: totalTimeframe,
        perfectTimeframe: [totalTimeframe*0.2, totalTimeframe*0.4],
        canBeWatered: false,
        needsWater: false,
        level: 1,
        plantScore: 0,
      };


      const plantRef: DocumentReference<Plant> = await this.db.collection<Plant>('plants').add(newPlant);

      await this.db.collection('users').doc(user!.uid).update({
        plantId: plantRef.id,
      });

      const alert = await this.alertController.create({
        header: 'Plant Created',
        message: 'New plant has been created.',
        buttons: ['OK']
        
      });
      await alert.present();
    } catch (error) {
      console.error('Error creating plant:', error);
    }
  }

  async getUserPlant():Promise<any> {
    try {
      await this.afAuth.user.subscribe(async user => {
        await this.db.collection("plants").ref.where("uid", "==", user?.uid).get().then((data: any) => {
          data.forEach(async (mathias: any) => {
            this.plant = mathias.data()
            await this.calculateWaterLevel()
          });
        })
      })
    } catch (error) {
      console.error('Error while fetching plant:', error)
    }
    return this.plant
  }

  async calculateWaterLevel() {
    if (this.plant != null) {
      let lastWatered = this.plant.lastWatered
      let waterLevel = this.plant.water
      let totalWaterInterval = this.plant.waterInterval
      let waterTimeframe = this.plant.perfectTimeframe
      let currentTime = Date.now()
      let canBeWateredBool = false
      let needsWaterBool = false

      let timeElapsed = (currentTime - lastWatered) / 60_000
      let minutesBar = totalWaterInterval - timeElapsed
      waterLevel = ((minutesBar / totalWaterInterval) * 100)

      if (minutesBar <= waterTimeframe[1]) {
        canBeWateredBool = true
      }
      else {
        canBeWateredBool = false
      }
      if (minutesBar <= waterTimeframe[0]) {
        needsWaterBool = true
      }
      else {
        needsWaterBool = false
      }

      this.plant.currentWaterLevel = waterLevel.toFixed(2);
      this.plant.canBeWatered = canBeWateredBool;
      this.plant.needsWater = needsWaterBool;

      try {
        await this.afAuth.user.subscribe(async user => {
          if (user) {
            this.db.collection('plants').ref.where("uid", "==", user?.uid).get().then((data: any) => {
              data.forEach(async (raul: any) => {
                let plantId = raul.id
                await this.db.collection("plants").doc(plantId).update(
                  {
                    water: this.plant.currentWaterLevel,
                    needsWater: this.plant.needsWater,
                    canBeWatered: this.plant.canBeWatered,
                  }
                ).then(async () => {
                  await this.calculateScore()
                })
              });
            });
          }
        });
      } catch (error) {
      console.error('Error while updating plant:', error)
    }

      // DEBUG
      console.log(Math.floor(minutesBar))
      console.log(waterLevel.toFixed(2) + "%")
    }
  }

  async calculateScore() {
    let plantLevel = this.plant.level;
    let plantXP = this.plant.experience;
    let plantHealth = this.plant.health;
    let KD = this.plant.wins / this.plant.losses;

    let userScore = (plantLevel * 0.45 + plantXP * 0.05 + plantHealth * 0.25 + KD * 0.25)

    console.log("User Score: " + userScore)
    console.log("plantLevel: " + plantLevel)
    console.log("plantXP: " + plantXP)
    console.log("plantHealth: " + plantHealth)
    console.log("KD: " + KD)

    this.db.collection("users").doc(this.auth.uid).update({
      plantScore: userScore,
    })
  }

}
