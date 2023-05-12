import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPlantPageRoutingModule } from './new-plant-routing.module';

import { NewPlantPage } from './new-plant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPlantPageRoutingModule
  ],
  declarations: [NewPlantPage]
})
export class NewPlantPageModule {}
