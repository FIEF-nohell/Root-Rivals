import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.page.html',
  styleUrls: ['./plant.page.scss'],
})
export class PlantPage implements OnInit {

  constructor(private auth: AuthService, private plantService: PlantService) { }

  ngOnInit() {
  }

  waterplant() {
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
