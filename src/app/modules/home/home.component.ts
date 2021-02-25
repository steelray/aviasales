import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Self, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ISelectOption } from '@core/interfaces/select-option.interface';
import { NgOnDestroy } from '@core/services/destroy.service';
import { SearchSearvice } from '@core/services/search.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { combineLatest, from, Observable, of } from 'rxjs';
import { debounceTime, filter, finalize, map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { placesParams } from '@core/const/places-params';
import { IFlightSearchParams, IPlace } from '@core/interfaces/search.interfaces';
import { TRIP_CLASS } from '@core/enums/trip-class.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, NgOnDestroy]
})
export class HomeComponent implements OnInit {
  fromOptions$: Observable<ISelectOption[]>;
  toOptions$: Observable<ISelectOption[]>;
  passengersQuantityOptions: ISelectOption[] = [
    {
      value: 1,
      title: '1'
    },
    {
      value: 2,
      title: '2'
    },
  ];

  form: FormGroup;
  tripClassOptions: ISelectOption[] = [
    {
      value: TRIP_CLASS.ECONOMY,
      title: 'Эконом'
    },
    {
      value: TRIP_CLASS.COMFORT,
      title: 'Комфорт'
    },
    {
      value: TRIP_CLASS.BUSINESS,
      title: 'Бизнес'
    },
    {
      value: TRIP_CLASS.FIRST,
      title: 'Первый класс'
    }
  ];
  maxPassengersCount = 9;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private searchService: SearchSearvice,
    @Self() private onDestroy$: NgOnDestroy,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.fromOptions$ = this.controls.departure.valueChanges.pipe(
      debounceTime(400),
      filter(value => !!value && typeof value === 'string'),
      switchMap(value => {
        const searchParams = placesParams;
        placesParams.term = value;
        return this.searchService.places(searchParams);
      }),
      map(res => this.prepareSelectOptions(res)),
      // tap(res => console.log(res))
    );

    this.toOptions$ = this.controls.arrival.valueChanges.pipe(
      debounceTime(400),
      filter(value => !!value && typeof value === 'string'),
      switchMap(value => {
        const searchParams = placesParams;
        placesParams.term = value;
        return this.searchService.places(searchParams);
      }),
      map(res => this.prepareSelectOptions(res))
    );

    console.log(this.controls);
  }

  get controls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get passengersCount(): number {
    const controls: any = this.controls;
    // tslint:disable-next-line:max-line-length
    const res = controls.passengers.controls.adults.value + controls.passengers.controls.children.value + controls.passengers.controls.infants.value;
    return res;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value;
    const { adults, children, infants } = this.form.value.passengers;

    const queryParams: any = {
      adults,
      children,
      infants,
      trip_class: formValue.trip_class
    };

    queryParams.departure_date = this.transformDate(formValue.departure_date);
    queryParams.arrival_date = this.transformDate(formValue.arrival_date);
    queryParams.departure = formValue.departure.value;
    queryParams.arrival = formValue.arrival.value;


    this.router.navigate(['/races'], { queryParams });

    // this.searchService.flightSearch(this.prepareParams(formValue)).pipe(
    //   map(res => res.search_id),
    //   takeUntil(this.onDestroy$)
    // ).subscribe(searchId => this.router.navigate(['/races', searchId]));
  }

  private buildForm(): void {
    this.form = this.fb.group({
      departure: ['', RxwebValidators.required()],
      arrival: ['', RxwebValidators.required()],
      departure_date: ['', RxwebValidators.required()],
      arrival_date: ['', RxwebValidators.required()],
      passengers: this.fb.group({
        adults: [1],
        children: [0],
        infants: [0],
      }),
      trip_class: [TRIP_CLASS.ECONOMY]
    });
  }

  private transformDate(date: any): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  private prepareParams(formValue: any): IFlightSearchParams {
    const { departure, arrival, departure_date, arrival_date, passengers, trip_class } = formValue;

    const params: IFlightSearchParams = {
      currency: 'uzs',
      locale: 'ru',
      know_english: true,
      trip_class,
      passengers: {
        adults: +passengers.adults,
        children: +passengers.children,
        infants: +passengers.infants,
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

  private prepareSelectOptions(places: IPlace[]): ISelectOption[] {

    return places.map(place => ({
      value: place.code,
      title: place.name,
      sub_title: place?.country_name
    }));

  }
}
