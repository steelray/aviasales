import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef, Input, Self } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAirline, IAirport, ISearchResultFilter, ISearchResultSegments } from '@core/interfaces/search.interfaces';
import { ISelectOption } from '@core/interfaces/select-option.interface';
import { NgOnDestroy } from '@core/services/destroy.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

enum FILTER_TYPES {
  BAGGAGE = 'baggage',
  TRAVEL_TIME = 'travel_time',
  TICKET_PRICE = 'ticket_price',
  AIRPORT = 'airport',
  TRAVEL_DURATION = 'travel_duration',
  AIRLINE = 'airline'
}

@Component({
  selector: 'app-races-filter',
  templateUrl: './races-filter.component.html',
  styleUrls: ['./races-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class RacesFilterComponent implements OnInit {
  @Input() filtersData: ISearchResultFilter;
  @Input() searchSegments: ISearchResultSegments;
  @Input() airports: IAirport[];
  @Input() airlines: IAirline[];
  @Output() closed = new EventEmitter();
  @Output() filterChanged = new EventEmitter();

  activeFilterType: ISelectOption;
  filterTypesEnum = FILTER_TYPES;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Self() private onDestroy$: NgOnDestroy
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      airline: [this.airlines.map(airline => airline.iata)],
      airport: this.fb.group({
        to: this.fb.group({
          arrival: [this.filtersData.airports.arrival],
          departure: [this.filtersData.airports.departure]
        }),
        back: this.fb.group({
          arrival: [this.filtersData.airports.departure],
          departure: [this.filtersData.airports.arrival],
        })
      }),
      // baggage: [],
      flights_duration: [[this.filtersData.flights_duration.min, this.filtersData.flights_duration.max]],
      price: [[this.filtersData.price.min, this.filtersData.price.max]],
      travel_time: this.fb.group({
        to: this.fb.group({
          departure: [[this.filtersData.departure_minutes.to.min, this.filtersData.departure_minutes.to.max]],
          arrival: [[this.filtersData.arrival_datetime.to.min, this.filtersData.arrival_datetime.to.max]]
        }),
        back: this.fb.group({
          departure: [[this.filtersData.departure_minutes.back.min, this.filtersData.departure_minutes.back.max]],
          arrival: [[this.filtersData.arrival_datetime.back.min, this.filtersData.arrival_datetime.back.max]]
        })
      })
    });


    this.form.valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.onDestroy$)
    ).subscribe(res => {

      const filterData = { ...res };

      const toDepDate = this.searchSegments.to.depart_date;
      filterData.travel_time.to.departure = [
        this.minsToUnix(toDepDate, res.travel_time.to.departure[0]),
        this.minsToUnix(toDepDate, res.travel_time.to.departure[1]),
      ];
      if (this.searchSegments.back) {
        const backDepDate = this.searchSegments.back.depart_date;
        filterData.travel_time.back.departure = [
          this.minsToUnix(backDepDate, res.travel_time.back.departure[0]),
          this.minsToUnix(backDepDate, res.travel_time.back.departure[1]),
        ];
      }

      console.log(filterData);

      this.filterChanged.emit(res);
    });
  }

  get filterItems(): ISelectOption[] {
    return [
      {
        value: FILTER_TYPES.TRAVEL_TIME,
        title: 'Время вылета и прибытия'
      },
      // {
      //   value: FILTER_TYPES.BAGGAGE,
      //   title: 'Багаж'
      // },
      {
        value: FILTER_TYPES.TRAVEL_DURATION,
        title: 'Время в пути'
      },
      {
        value: FILTER_TYPES.TICKET_PRICE,
        title: 'Цена билета'
      },
      {
        value: FILTER_TYPES.AIRPORT,
        title: 'Аэропорт'
      },
      {
        value: FILTER_TYPES.AIRLINE,
        title: 'Авиакомпания'
      },
    ];
  }

  onClose(): void {
    this.closed.emit();
  }

  onFilterItemCollapse(type: ISelectOption): void {
    this.activeFilterType = type;
  }

  backToMainFilters(): void {
    this.activeFilterType = null;
  }

  private minsToUnix(date: string, mins: number): number {
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
