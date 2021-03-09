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
    @Self() private onDestroy$: NgOnDestroy,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.form.setValue(this.formDefaultValues());

    this.form.valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.onDestroy$)
    ).subscribe(res => {
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

  onReset(): void {
    this.form.setValue(this.formDefaultValues());
    this.activeFilterType = null;
  }

  private buildForm(): void {
    this.form = this.fb.group({
      airline: [],
      airport: this.fb.group({
        to: this.fb.group({
          arrival: [],
          departure: []
        }),
        back: this.fb.group({
          arrival: [],
          departure: [],
        })
      }),
      // baggage: [],
      flights_duration: this.fb.group({
        to: [],
        back: [],
      }),
      price: [],
      travel_time: this.fb.group({
        to: this.fb.group({
          departure: [],
          arrival: []
        }),
        back: this.fb.group({
          departure: [],
          arrival: []
        })
      })
    });
  }

  private formDefaultValues(): any {
    return {
      airline: this.airlines.map(airline => airline.iata),
      airport: {
        to: {
          arrival: this.filtersData.airports.arrival,
          departure: this.filtersData.airports.departure
        },
        back: {
          arrival: this.filtersData.airports.departure,
          departure: this.filtersData.airports.arrival,
        }
      },
      flights_duration: {
        to: [this.filtersData.flights_duration.to.min, this.filtersData.flights_duration.to.max],
        back: [this.filtersData.flights_duration.back.min, this.filtersData.flights_duration.back.max],
      },
      price: [this.filtersData.price.min, this.filtersData.price.max],
      travel_time: {
        to: {
          departure: [this.filtersData.departure_datetime.to.min, this.filtersData.departure_datetime.to.max],
          arrival: [this.filtersData.arrival_datetime.to.min, this.filtersData.arrival_datetime.to.max]
        },
        back: {
          departure: [this.filtersData.departure_datetime?.back?.min, this.filtersData.departure_datetime?.back?.max],
          arrival: [this.filtersData.arrival_datetime?.back?.min, this.filtersData.arrival_datetime?.back?.max]
        }
      }
    };
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
