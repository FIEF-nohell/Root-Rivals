import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FightService } from 'src/app/services/fight.service';
import { PlantService } from 'src/app/services/plant.service'; 

@Component({
  selector: 'app-plant',
  templateUrl: './plant.page.html',
  styleUrls: ['./plant.page.scss'],
})
export class PlantPage implements OnInit, ViewWillEnter {

  constructor(private auth: AuthService, private plantService: PlantService, private fightService: FightService) {}

  canBeWatered = false
  needsWater = false
  plantLel: any;

  public progress = 0;

  ionViewWillEnter() {
    let plantTemp: any
    this.plantService.getUserPlantObservable().subscribe((plant) => { // Check if can be watered
      if (plant && plant.canBeWatered !== undefined) {
        plantTemp = plant;  

        let updatedPlantLel = { 
          ...this.plantLel,
          health: plantTemp.health 
        };

        this.plantLel = updatedPlantLel
      }
    });
  }

  ngOnInit() { 
    this.plantCheck() // Check if user has Plant

    this.plantService.getUserPlantObservable().subscribe((plant) => { // Check if can be watered
      if (plant && plant.canBeWatered !== undefined) {
        this.plantLel = plant; 
        this.canBeWatered = plant.canBeWatered;
        this.needsWater = plant.needsWater;
        this.progress = this.plantLel.water * 0.01  
      }
    });

    setInterval(() => {
      this.plantService.calculateWaterLevel()
      this.plantLel.water = this.plantService.plant.currentWaterLevel
      this.canBeWatered = this.plantService.plant.canBeWatered;
      this.progress = this.plantLel.water * 0.01  
    }, 1000)
  }

  async plantCheck(){
    this.plantService.hasPlant()
  }

  async waterPlant() {
    this.plantService.waterPlant(this.plantLel);
    this.plantLel.water = 100
    this.plantService.plant.currentWaterLevel = 100;
    this.plantService.plant.canBeWatered = false;
  }

  stats() {
    this.plantService.getUserPlant();
  }

  logout() {
    this.auth.signOut();
  }

}