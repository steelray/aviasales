import { Component, OnInit, ChangeDetectionStrategy, Self, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TRIP_CLASS } from '@core/enums/trip-class.enum';
import { IFlight, IFlightSearchParams } from '@core/interfaces/search.interfaces';
import { SearchResult } from '@core/models/search-result.model';
import { NgOnDestroy } from '@core/services/destroy.service';
import { SearchSearvice } from '@core/services/search.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class RacesComponent implements OnInit {
  filterIsActive = false;
  searchResult$: Observable<SearchResult>;
  searchRequestResult$: Observable<any>;
  airlineLogoEndpoint = environment.airlineLogoEndpoint;
  allFlights: IFlight[];
  flights: IFlight[] = [];
  visibleItems = 3;


  @HostListener('keyup')
  onKeyup(event: Event): void {
    console.log(event);
  }

  constructor(
    @Self() private onDestroy$: NgOnDestroy,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchSearvice
  ) { }

  ngOnInit(): void {
    this.searchResult$ = this.searchService.flightSearch(this.prepareParams()).pipe(
      switchMap(res => this.searchService.flightSearchResults(res.search_id)),
      map(res => new SearchResult(res, this.searchService.flightSearch$.getValue())),
      tap(res => {
        this.allFlights = res.flights;
        this.flights = this.addItems();
      })
    );
  }

  onFilterToggle(): void {
    this.filterIsActive = !this.filterIsActive;
  }


  onScrollDown(): void {
    this.flights = this.addItems();
  }

  trackByFn(index: number): number {
    return index;
  }

  private addItems(): IFlight[] {
    return [...this.flights, ...this.allFlights.slice(this.flights.length, this.visibleItems + this.flights.length)];
  }

  private prepareParams(): IFlightSearchParams {
    const { departure, arrival, departure_date, arrival_date, passengers, trip_class } = this.activatedRoute.snapshot.queryParams;

    const params: IFlightSearchParams = {
      currency: 'uzs',
      locale: 'ru',
      know_english: true,
      trip_class: trip_class ? trip_class : TRIP_CLASS.ECONOMY,
      passengers: {
        adults: +passengers
      },
      segments: [
        {
          origin: departure,
          destination: arrival,
          date: departure_date
        },
        {
          origin: arrival,
          destination: departure,
          date: arrival_date
        },
      ]
    };
    return params;
  }




}
