import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Self, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ISelectOption } from '@core/interfaces/select-option.interface';
import { NgOnDestroy } from '@core/services/destroy.service';
import { SearchSearvice } from '@core/services/search.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { combineLatest, Observable, of } from 'rxjs';
import { debounceTime, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { placesParams } from '@core/const/places-params';
import { IPlace } from '@core/interfaces/search.interfaces';
import { TRIP_CLASS } from '@core/enums/trip-class.enum';
import * as moment from 'moment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TranslateService } from '@ngx-translate/core';
import { Metrika } from 'ng-yandex-metrika';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe, NgOnDestroy]
})
export class HomeComponent implements OnInit {
  private readonly lsKey = '__pmAviasalesFilter';
  isMobile = false;
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
      title: 'ECONOMY'
    },
    // {
    //   value: TRIP_CLASS.COMFORT,
    //   title: 'Комфорт'
    // },
    {
      value: TRIP_CLASS.BUSINESS,
      title: 'BUSINESS'
    },
    // {
    //   value: TRIP_CLASS.FIRST,
    //   title: 'Первый класс'
    // }
  ];
  maxPassengersCount = 9;
  departureMinDate = new Date();
  departureMaxDate = new Date(this.departureMinDate.getFullYear() + 1, this.departureMinDate.getMonth(), this.departureMinDate.getDate());


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private searchService: SearchSearvice,
    @Self() private onDestroy$: NgOnDestroy,
    private deviceService: DeviceDetectorService,
    private translateService: TranslateService,
    private metrika: Metrika,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef

  ) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {

    this.buildForm();
    this.setFormValueFromStorage();
    this.controls.departure_date.valueChanges.pipe(
      filter(res => !!res),
      takeUntil(this.onDestroy$)
    ).subscribe(depDate => {
      const arrivalDate = this.controls.arrival_date.value;
      if (arrivalDate && depDate > arrivalDate) {

        this.controls.arrival_date.setValue(depDate);
      }
    });

    this.fromOptions$ = this.controls.departure.valueChanges.pipe(
      filter(value => !!value && typeof value === 'string'),
      switchMap(value => {
        const searchParams = placesParams;
        placesParams.term = value;
        return this.searchService.places2(searchParams);
      }),
      map(res => this.prepareSelectOptions(res)),
    );

    this.toOptions$ = this.controls.arrival.valueChanges.pipe(
      filter(value => !!value && typeof value === 'string'),
      switchMap(value => {
        const searchParams = placesParams;
        placesParams.term = value;
        return this.searchService.places2(searchParams);
      }),
      map(res => this.prepareSelectOptions(res))
    );

    this.ymEventsInit();

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

  get activeTripClass(): string {
    return this.tripClassOptions.find(tripClass => tripClass.value === this.controls.trip_class.value)?.title;
  }

  replaceDiractions(): void {
    const { departure, arrival } = this.form.value;
    if (departure && arrival) {
      this.controls.departure.setValue(arrival);
      this.controls.arrival.setValue(departure);
    }
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

    sessionStorage.setItem(this.lsKey, JSON.stringify(queryParams));

    this.metrika.fireEvent('Avia_search_started');

    this.router.navigate(['/races'], { queryParams });
  }

  onPassengersMenuOpen(): void {
    this.metrika.fireEvent('Avia_passengers_open');
  }



  private buildForm(): void {
    this.form = this.fb.group({
      departure: ['', RxwebValidators.required()],
      arrival: ['', [RxwebValidators.required(), this.compareCities]],
      departure_date: ['', RxwebValidators.required()],
      arrival_date: [''],
      passengers: this.fb.group({
        adults: [1],
        children: [0],
        infants: [0],
      }),
      trip_class: [TRIP_CLASS.ECONOMY]
    });
  }

  private setFormValueFromStorage(): void {
    const storageData = JSON.parse(sessionStorage.getItem(this.lsKey));
    if (!storageData) {
      return;
    }
    const {
      adults,
      arrival,
      arrival_date,
      children,
      departure,
      departure_date,
      infants,
      trip_class
    } = storageData;
    combineLatest([
      this.searchService.places2({ ...placesParams, term: departure }),
      this.searchService.places2({ ...placesParams, term: arrival }),
    ]).pipe(
      map(res => ({
        departure: res[0].find(place => place.code === departure),
        arrival: res[1].find(place => place.code === arrival),
      })),
      takeUntil(this.onDestroy$)
    ).subscribe(res => {
      this.controls.departure.setValue({
        title: res.departure.name,
        value: res.departure.code
      }, { emitEvent: false });
      if (res.departure.code !== res.arrival.code) {
        this.controls.arrival.setValue({
          title: res.arrival.name,
          value: res.arrival.code
        }, { emitEvent: false });
      }
    });

    let departureDate = departure_date;

    const currentDate = moment().format('yyyy-MM-DD');
    if (currentDate > departure_date) {
      departureDate = currentDate;
    }

    this.controls.departure_date.setValue(new Date(departureDate), { emitEvent: false });
    if (arrival_date) {
      this.controls.arrival_date.setValue(new Date(arrival_date), { emitEvent: false });
    }

    this.controls.passengers.setValue({
      adults,
      children,
      infants
    }, { emitEvent: false });
    this.controls.trip_class.setValue(trip_class, { emitEvent: false });
  }

  private transformDate(date: any): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  private prepareSelectOptions(places: IPlace[]): ISelectOption[] {

    return places.map(place => ({
      value: place.code,
      title: place.name,
      sub_title: place?.country_name
    }));

  }

  private compareCities(control: AbstractControl): any {
    if (control.parent) {
      const arrival = control.value;
      const departure = control.parent.get('departure').value;
      if (arrival.value && arrival.value === departure?.value) {
        return {
          citiesErrors: {
            message: 'ERRORS.CITIES_MUST_BE_DIFFERENT'
          }
        };
      }
    }
    return null;

  }

  private ymEventsInit(): void {
    this.metrika.fireEvent('Avia_open');
    combineLatest([
      this.controls.departure.valueChanges.pipe(
        filter(res => !!res),
        filter(res => typeof res !== 'string'),
        tap(() => this.metrika.fireEvent('Avia_from_filled'))
      ),
      this.controls.arrival.valueChanges.pipe(
        filter(res => !!res),
        filter(res => typeof res !== 'string'),
        tap(() => this.metrika.fireEvent('Avia_to_filled'))
      ),
      this.controls.departure_date.valueChanges.pipe(
        filter(res => !!res),
        tap(() => this.metrika.fireEvent('Avia_date_to_filled'))
      ),
      this.controls.arrival_date.valueChanges.pipe(
        filter(res => !!res),
        tap(() => this.metrika.fireEvent('Avia_date_back_filled'))
      ),
      this.controls.trip_class.valueChanges.pipe(
        filter(res => !!res),
        tap((res) => {
          if (res === TRIP_CLASS.ECONOMY) {
            this.metrika.fireEvent('Avia_passengers_economy_selected');
          }
          if (res === TRIP_CLASS.BUSINESS) {
            this.metrika.fireEvent('Avia_passengers_business_selected');
          }
        })
      ),
    ]).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe();
  }



  private getUserCurrentLocation(): void {
    // if (window.navigator.geolocation) {
    //   window.navigator.geolocation
    //     .getCurrentPosition(this.successFunction, console.error);
    // }
  }

  // private successFunction(position) {
  //   var lat = position.coords.latitude;
  //   var lng = position.coords.longitude;
  //   codeLatLng(lat, lng)
  // }
}
