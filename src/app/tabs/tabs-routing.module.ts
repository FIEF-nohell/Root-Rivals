import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'scoreboard',
        loadChildren: () => import('../pages/scoreboard/scoreboard.module').then(m => m.ScoreboardPageModule), 
        title: "Scoreboard"
      },   
      {
        path: 'fight',
        loadChildren: () => import('../pages/fight/fight.module').then(m => m.FightPageModule),
        title: "Fight"
      },  
      {
        path: 'plant',
        loadChildren: () => import('../pages/plant/plant.module').then(m => m.PlantPageModule),
        title: "My Plant"
      }, 
      {
        path: 'notifications',
        loadChildren: () => import('../pages/notifications/notifications.module').then(m => m.NotificationsPageModule),
        title: "Notifications"
      }, 
      {
        path: 'settings',
        loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule),
        title: "Settings"
      }, 
      {
        path: '',
        redirectTo: '/tabs/feed',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/plant',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}