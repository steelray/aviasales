import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component';
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
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
