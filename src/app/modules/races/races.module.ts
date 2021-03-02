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
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { RaceViewComponent } from './race-view/race-view.component';
import { GetCityPipe } from '@core/pipes/get-city.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GetAirlineNamePipe } from '@core/pipes/get-airline-name.pipe';
import { RaceFilterPriceComponent } from './races-filter/race-filter-price/race-filter-price.component';
import { RaceFilterBaggageComponent } from './races-filter/race-filter-baggage/race-filter-baggage.component';
import { RaceFilterAirportComponent } from './races-filter/race-filter-airport/race-filter-airport.component';
import { RaceFilterAirlineComponent } from './races-filter/race-filter-airline/race-filter-airline.component';
import { RaceFilterDurationComponent } from './races-filter/race-filter-duration/race-filter-duration.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GetAirportNamePipe } from '@core/pipes/get-airport-name.pipe';
import { GetCityTimeZonePipe } from '@core/pipes/get-city-timezone.pipe';
import { CustomDatePipe } from '@core/pipes/custom-date.pipe';
import { RaceFilterChecboxesGroupComponent } from './races-filter/race-filter-checkboxes-group.component';
import { InArrayPipe } from '@core/pipes/in-array.pipe';
import { GetBaggageHandbagInfoPipe } from '@core/pipes/get-baggage-kg.pipe';
import { RaceViewDetailsComponent } from './race-view/race-view-details/race-view-details.component';

@NgModule({
  declarations: [
    RacesComponent,
    RacesFilterComponent,
    RacesFilterTravelTimeComponent,
    CustomNumber,
    MinutesToHoursMins,
    GetAirlineLogo,
    TransferCount,
    RaceViewComponent,
    GetCityPipe,
    GetAirlineNamePipe,
    RaceFilterPriceComponent,
    RaceFilterBaggageComponent,
    RaceFilterAirportComponent,
    RaceFilterAirlineComponent,
    RaceFilterDurationComponent,
    GetAirportNamePipe,
    GetCityTimeZonePipe,
    CustomDatePipe,
    RaceFilterChecboxesGroupComponent,
    InArrayPipe,
    GetBaggageHandbagInfoPipe,
    RaceViewDetailsComponent
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
    InfiniteScrollModule,
    NgxSliderModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class RacesModule { }
