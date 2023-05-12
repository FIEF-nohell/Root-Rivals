import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

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
  health: number;               // 0 - 100
  waterInterval: number,        // in minutes
  perfectTimeframe: number[],
  canBeWatered: boolean,        // water level is below 120
  needsWater: boolean,          // water level is below 60
}

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private alertController: AlertController) { }

  plant: any = [];

  async createPlant() {
    try {
      const user = await this.afAuth.currentUser;

      const newPlant: Plant = {
        name: user!.displayName! + "'s Plant",
        owner: user!.displayName!,
        uid: user!.uid!,
        water: 100,
        lastWatered: Date.now(),
        born: Date.now(),
        lastDrought: null,
        defense: 2,
        damage: 10,
        experience: 0,
        wins: 0,
        losses: 0,
        health: 100,
        waterInterval: 300,
        perfectTimeframe: [60, 120],
        canBeWatered: false,
        needsWater: false,
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

  async getUserPlant() {
    try {
      await this.afAuth.user.subscribe(async user => {
        await this.db.collection("plants").ref.where("uid", "==", user?.uid).get().then((data: any) => {
          data.forEach((element: any) => {
            this.plant = element.data()
            console.log(this.plant)
            this.calculateWaterLevel()
          });
        })
      })
    } catch (error) {
      console.error('Error while fetching plant:', error)
    }
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
            console.log(user.uid)
            const docRef = this.db.collection('plants').ref.where("uid", "==", user?.uid).get().then((data: any) => {
              data.forEach(async (element: any) => {
                let plantId = element.id
                await this.db.collection("plants").doc(plantId).update(
                  {
                    water: this.plant.currentWaterLevel,
                    needsWater: this.plant.needsWater,
                    canBeWatered: this.plant.canBeWatered
                  }
                )
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

}
