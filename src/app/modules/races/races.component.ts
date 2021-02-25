import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Self, ChangeDetectorRef, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TRIP_CLASS } from '@core/enums/trip-class.enum';
import { IFlight, IFlightSearchParams, ISearchResult } from '@core/interfaces/search.interfaces';
import { SearchResult } from '@core/models/search-result.model';
import { NgOnDestroy } from '@core/services/destroy.service';
import { SearchSearvice } from '@core/services/search.service';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class RacesComponent implements OnInit {
  filterIsActive = false;
  allResults$: Observable<SearchResult>;
  searchResult: ISearchResult; // prepared search result
  flightSearch: any;
  airlineLogoEndpoint = environment.airlineLogoEndpoint;
  allFlights: IFlight[] = [];
  visibleFlights: IFlight[] = [];
  visibleItemsCount = 3;
  viewItem: IFlight;
  currentScrollPosition = 0;
  updateList$ = new BehaviorSubject(null);
  departureIATA: string;
  arrivalIATA: string;

  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchSearvice,
    private cdRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
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
        // add items if less then 'visibleItemsCount'
        if (!this.visibleFlights.length || this.visibleFlights.length < this.visibleItemsCount) {
          this.visibleFlights = this.addItems();
        }
        console.log(this.searchResult);
      })
    );
  }

  onFilterToggle(): void {
    this.filterIsActive = !this.filterIsActive;
  }


  onScrollDown(): void {
    this.visibleFlights = this.addItems();
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
    setTimeout(() => window.scroll(0, this.currentScrollPosition), 100);
  }

  private addItems(): IFlight[] {
    // tslint:disable-next-line:max-line-length
    return [...this.visibleFlights, ...this.allFlights.slice(this.visibleFlights.length, this.visibleItemsCount + this.visibleFlights.length)];
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

  onFilterChange(filterData: any): void {

  }


  private getUnixFromMins(date: string, mins: number): number {
    const toDepHoursMin = this.getHoursFromMins(mins);
    const toDepMinutesMin = this.getMinutesFromMins(mins);
    const m = moment();
    m.set({
      hour: toDepHoursMin,
      minutes: toDepMinutesMin
    });
    return m.unix();
  }

  private getHoursFromMins(mins: number): number {
    return Math.floor(mins / 60);
  }

  private getMinutesFromMins(mins: number): number {
    return mins % 60;
  }




}
