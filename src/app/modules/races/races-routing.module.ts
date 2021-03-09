import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaceTicketComponent } from './race-ticket/race-ticket.component';
import { RacesComponent } from './races.component';

const routes: Routes = [
  {
    path: '',
    component: RacesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RacesRoutingModule { }
