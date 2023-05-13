import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.page.html',
  styleUrls: ['./plant.page.scss'],
})
export class PlantPage implements OnInit {

  constructor(private auth: AuthService, private plantService: PlantService) {}

  canBeWatered = false
  needsWater = false
  plantLel: any;

  ngOnInit() {
    this.plantCheck()
    this.plantService.getUserPlantObservable().subscribe((plant) => {
      if (plant && plant.canBeWatered !== undefined) {
        this.plantLel = plant;
        this.canBeWatered = plant.canBeWatered;
        this.needsWater = plant.needsWater;
      }
    });
  }

  async plantCheck(){
    this.plantService.hasPlant()
  }

  waterPlant() {
    this.plantService.waterPlant(this.plantLel);
  }

  stats() {
    this.plantService.getUserPlant();
  }

  logout() {
    this.auth.signOut();
  }

}