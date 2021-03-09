import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceTicketComponent } from './modules/races/race-ticket/race-ticket.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'races',
    loadChildren: () => import('./modules/races/races.module').then(m => m.RacesModule),
  },
  {
    path: 'buy-ticket/:search_id/:url',
    component: RaceTicketComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
