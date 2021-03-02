import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Self, ChangeDetectorRef, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TRIP_CLASS } from '@core/enums/trip-class.enum';
import { IFlight, IFlightSearchParams, ISearchResult, ISearchResultFilter } from '@core/interfaces/search.interfaces';
import { SearchResult } from '@core/models/search-result.model';
import { NgOnDestroy } from '@core/services/destroy.service';
import { SearchSearvice } from '@core/services/search.service';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class RacesComponent implements OnInit {
  private readonly visibleItemsCount = 10;
  filterIsActive = false;
  allResults$: Observable<SearchResult>;
  searchResult: ISearchResult; // prepared search result
  flightSearch: any;
  airlineLogoEndpoint = environment.airlineLogoEndpoint;
  allFlights: IFlight[] = [];
  filteredFlights: IFlight[] = []; // by default all flights
  visibleFlights$ = new BehaviorSubject<IFlight[]>([]);
  viewItem: IFlight; // items detail view
  currentScrollPosition = 0;
  updateList$ = new BehaviorSubject(null);
  departureIATA: string;
  arrivalIATA: string;

  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchSearvice,
    private cdRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    @Self() private onDestroy$: NgOnDestroy
  ) { }

  ngOnInit(): void {
    this.allResults$ = this.updateList$.pipe(
      switchMap(() => {
        if (!this.flightSearch) {
          // new search
          return this.searchService.flightSearch(this.prepareParams()).pipe(
            tap(res => this.flightSearch = res)
          );
        }
        // search by stored search id
        return of(this.flightSearch);
      }),
      switchMap(() => this.searchService.flightSearchResults(this.flightSearch.search_id)),
      // filter(res => {
      //   const filterRes = res && res.length && res[0].proposals && !(res[1] && !res[1]?.proposals);
      //   if (res && res.length && res[0].proposals && !(res[1] && !res[1]?.proposals)) {
      //     this.updateList$.next(null);
      //     this.isLoading = true;
      //   } else {
      //     this.isLoading = false;
      //     this.cdRef.detectChanges();
      //   }
      //   return filterRes;
      // }),
      /*
        * searchResult передаем, чтоб новые данные фильтров(каждый запрос
        * flightSearchResults возвращает новые фильтры с результатами) добавлялись в старые
      */
      map(res => new SearchResult(res, this.flightSearch, this.searchResult)),
      tap(res => {
        this.searchResult = res;
        this.isLoading = false;
        this.allFlights = [...this.allFlights, ...res.flights];
        this.filteredFlights = this.allFlights;
        // add items if less then 'visibleItemsCount'
        const currentVisibleFlights = this.visibleFlights$.getValue();
        if (!currentVisibleFlights.length || currentVisibleFlights.length < this.visibleItemsCount) {
          this.visibleFlights$.next(this.addItems());
        }
        // console.log(this.allFlights.map(flight => flight.price).sort((a, b) => a - b));
        this.viewItem = this.allFlights[0];
      })
    );
  }

  onFilterToggle(): void {
    this.filterIsActive = !this.filterIsActive;
  }


  onScrollDown(): void {
    this.visibleFlights$.next(this.addItems());
  }

  trackByFn(index: number): number {
    return index;
  }

  onView(e: Event, flight: IFlight): void {
    e.preventDefault();
    this.currentScrollPosition = this.document.documentElement.scrollTop;
    this.viewItem = flight;
  }

  onBackToList(): void {
    this.viewItem = null;
    setTimeout(() => window.scroll(0, this.currentScrollPosition), 30);
  }


  onFilterChange(filters: any): void {
    this.visibleFlights$.next([]); // reset current visible flights
    this.filteredFlights = this.filterFlights(filters); // fliter all flights
    this.visibleFlights$.next(this.addItems()); // add filtered items to visible flights
  }

  onBuy(url: number): void {
    this.searchService.flightSearchClick(this.flightSearch.search_id, url).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(res => {
      window.open(res.url, '_blank');
    });
  }

  private filterFlights(filters: any): IFlight[] {
    const allFlgihts = this.allFlights;
    return allFlgihts.filter(flight => {
      let res = true;

      switch (true) {
        case !flight.carriers.filter(iata => filters.airline.find(airline => airline === iata)).length:
          res = false;
          break;
        case !filters.airport.to.arrival.includes(flight.segment.to.arrival):
          res = false;
          break;
        case !filters.airport.to.departure.includes(flight.segment.to.departure):
          res = false;
          break;
        case !filters.airport.back?.arrival?.includes(flight.segment?.back?.arrival):
          res = false;
          break;
        case !filters.airport?.back?.departure.includes(flight.segment?.back?.departure):
          res = false;
          break;
        case !(flight.price >= filters.price[0] && flight.price <= filters.price[1]):
          res = false;
          break;
        case !(
          flight.segment.to.total_duration >= filters.flights_duration.to[0]
          &&
          flight.segment.to.total_duration <= filters.flights_duration.to[1]
        ):
          res = false;
          break;
        case !(
          flight.segment.back.total_duration >= filters.flights_duration.back[0]
          &&
          flight.segment.back.total_duration <= filters.flights_duration.back[1]
        ):
          res = false;
          break;
      }



      return res;
    });
  }


  private addItems(): IFlight[] {
    const currentVisibleFlights = this.visibleFlights$.getValue();

    // tslint:disable-next-line:max-line-length
    return [...currentVisibleFlights, ...this.filteredFlights.slice(currentVisibleFlights.length, this.visibleItemsCount + currentVisibleFlights.length)];
  }


  private prepareParams(): IFlightSearchParams {
    const {
      departure,
      arrival,
      departure_date,
      arrival_date,
      children,
      adults,
      infants,
      trip_class
    } = this.activatedRoute.snapshot.queryParams;
    this.departureIATA = departure;
    this.arrivalIATA = arrival;
    const params: IFlightSearchParams = {
      currency: 'uzs',
      locale: 'ru',
      know_english: true,
      trip_class: trip_class ? trip_class : TRIP_CLASS.ECONOMY,
      passengers: {
        adults: +adults,
        children: +children,
        infants: +infants,
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
