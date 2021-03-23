import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef, Input, Self } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAirline, IAirport, ISearchResultFilter, ISearchResultSegments } from '@core/interfaces/search.interfaces';
import { ISelectOption } from '@core/interfaces/select-option.interface';
import { NgOnDestroy } from '@core/services/destroy.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

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
    private cdRef: ChangeDetectorRef,
    private translateService: TranslateService
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
        title: this.translateService.instant('FILTERS.DEPARTURE_ARRIVAL_TIME')
      },
      {
        value: FILTER_TYPES.TRAVEL_DURATION,
        title: this.translateService.instant('FILTERS.IN_TRANIST_DURATION')
      },
      {
        value: FILTER_TYPES.TICKET_PRICE,
        title: this.translateService.instant('FILTERS.TICKET_PRICE')
      },
      {
        value: FILTER_TYPES.AIRPORT,
        title: this.translateService.instant('FILTERS.AIRPORT')
      },
      {
        value: FILTER_TYPES.AIRLINE,
        title: this.translateService.instant('FILTERS.AIRLINE')
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

}
