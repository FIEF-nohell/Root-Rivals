import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPlantPage } from './new-plant.page';

const routes: Routes = [
  {
    path: '',
    component: NewPlantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPlantPageRoutingModule {}
