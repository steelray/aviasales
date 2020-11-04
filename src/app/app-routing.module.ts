import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'races/:id',
    loadChildren: () => import('./modules/race/race.module').then(m => m.RaceModule),
  },
  {
    path: 'races',
    loadChildren: () => import('./modules/races/races.module').then(m => m.RacesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
