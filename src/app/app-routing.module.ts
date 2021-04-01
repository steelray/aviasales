import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component';
import { RaceBuyTestComponent } from './modules/races/race-buy-test/race-buy-test.component';
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
    path: 'race-buy-test',
    component: RaceBuyTestComponent
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
