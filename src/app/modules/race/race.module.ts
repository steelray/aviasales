import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaceRoutingModule } from './race-routing.module';
import { RaceComponent } from './race.component';
import { ComponentsModule } from '@components/components.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [RaceComponent],
  imports: [
    CommonModule,
    RaceRoutingModule,
    ComponentsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ]
})
export class RaceModule { }
