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

  canBeWatered = this.plantService.plant.canBeWatered;

  async ngOnInit() {
    try {
      await this.plantService.getUserPlant();
      
      if (this.plantService.plant && this.plantService.plant.canBeWatered !== undefined) {
        this.canBeWatered = this.plantService.plant.canBeWatered;
        console.log(this.canBeWatered);
      } else {
        // Handle the case when the value is undefined or not available
        console.log("oof");
      }
    } catch (error) {
      // Handle any errors that occur during the getUserPlant() method
      console.error(error);
    }
  }

  waterPlant() {
    //this.plantService.createPlant("Desert");
  }

  createPlant() {
    this.plantService.createPlant();
  }

  createDesertPlant() {
    this.plantService.createPlant("Desert");
  }

  createTropicalPlant() {
    this.plantService.createPlant("Tropical");
  }

  getUserPlant() {
    this.plantService.getUserPlant();
  }

  stats() {
    this.plantService.getUserPlant();
  }

  logout() {
    this.auth.signOut();
  }

}
