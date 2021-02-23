import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RacesRoutingModule } from './races-routing.module';
import { RacesComponent } from './races.component';
import { ComponentsModule } from '@components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { RacesFilterComponent } from './races-filter/races-filter.component';
import { MatRippleModule } from '@angular/material/core';
import { RacesFilterTravelTimeComponent } from './races-filter/races-filter-travel-time/races-filter-travel-time.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomNumber } from '@core/pipes/custom-number.pipe';
import { GetAirlineLogo } from '@core/pipes/get-airline-logo.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MinutesToHoursMins } from '@core/pipes/minutes-to-hours.pipe';
import { TransferCount } from '@core/pipes/transfer-count.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    RacesComponent,
    RacesFilterComponent,
    RacesFilterTravelTimeComponent,
    CustomNumber,
    MinutesToHoursMins,
    GetAirlineLogo,
    TransferCount
  ],
  imports: [
    CommonModule,
    RouterModule,
    RacesRoutingModule,
    ComponentsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatRippleModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    InfiniteScrollModule
  ]
})
export class RacesModule { }
