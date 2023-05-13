import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-new-plant',
  templateUrl: './new-plant.page.html',
  styleUrls: ['./new-plant.page.scss'],
})
export class NewPlantPage implements OnInit {

  constructor(private alertController: AlertController) { }

  activePlant: string = ""

  async ngOnInit() {
    
  }

  async choosePlant(plant: string){
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
          },
        },
      ],
    });

    await alert.present();
  }

}
