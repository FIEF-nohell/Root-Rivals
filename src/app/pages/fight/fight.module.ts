import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FightPageRoutingModule } from './fight-routing.module';

import { FightPage } from './fight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FightPageRoutingModule
  ],
  declarations: [FightPage]
})
export class FightPageModule {}
