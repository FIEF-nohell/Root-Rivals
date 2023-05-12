import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FightPage } from './fight.page';

const routes: Routes = [
  {
    path: '',
    component: FightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FightPageRoutingModule {}
