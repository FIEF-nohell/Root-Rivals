import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-new-plant',
  templateUrl: './new-plant.page.html',
  styleUrls: ['./new-plant.page.scss'],
})
export class NewPlantPage implements OnInit {

  constructor(private alertController: AlertController, private plantService: PlantService, private modalController: ModalController) { }

  activePlant: string = ""
  type: string = ""

  async ngOnInit() {
    
  }

  async choosePlant(type: string, plant: string){
    const alert = await this.alertController.create({
      header: plant, 
      message: 'Are you sure you want to choose this as your plant?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.activePlant = plant
            this.type = type
          },
        },
      ],
    });

    await alert.present();
  }

  createPlant() {
    if (this.activePlant != "" && this.type != "") {
      let url = this.activePlant.toLowerCase().replace(/\s/g, "_");
      this.plantService.createPlant(this.type, url)
      this.modalController.dismiss()
    }
  }

}
