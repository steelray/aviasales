import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef, Input } from '@angular/core';
import { IAirline, IAirport, ISearchResultFilter, ISearchResultSegments } from '@core/interfaces/search.interfaces';
import { ISelectOption } from '@core/interfaces/select-option.interface';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RacesFilterComponent implements OnInit {
  @Input() filtersData: ISearchResultFilter;
  @Input() searchSegments: ISearchResultSegments;
  @Input() airports: IAirport[];
  @Input() airlines: IAirline[];
  @Output() closed = new EventEmitter();

  activeFilterType: ISelectOption;
  filterTypesEnum = FILTER_TYPES;

  constructor(
  ) { }

  ngOnInit(): void {
    this.activeFilterType = {
      value: FILTER_TYPES.TICKET_PRICE,
      title: 'Время в пути'
    };
  }

  get filterItems(): ISelectOption[] {
    return [
      {
        value: FILTER_TYPES.TRAVEL_TIME,
        title: 'Время вылета и прибытия'
      },
      {
        value: FILTER_TYPES.BAGGAGE,
        title: 'Багаж'
      },
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

}
