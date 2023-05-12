import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoreboardPage } from './scoreboard.page';

const routes: Routes = [
  {
    path: '',
    component: ScoreboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScoreboardPageRoutingModule {}
