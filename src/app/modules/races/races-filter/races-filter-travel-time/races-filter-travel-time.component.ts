import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAirport, ISearchResultFilterArrivalDateTime, ISearchResultSegments } from '@core/interfaces/search.interfaces';
import 'moment/min/locales';
import { CustomDatePipe } from '@core/pipes/custom-date.pipe';

@Component({
  selector: 'app-races-filter-travel-time',
  templateUrl: './races-filter-travel-time.component.html',
  styleUrls: ['./races-filter-travel-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CustomDatePipe]
})
export class RacesFilterTravelTimeComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() searchSegments: ISearchResultSegments;
  @Input() arrivalDatetime: ISearchResultFilterArrivalDateTime;
  @Input() departureDatetime: ISearchResultFilterArrivalDateTime;
  @Input() airports: IAirport[];

  rangeStep = 600; // in seconds(10 minutes)

  arrivalToOptions: Options;
  arrivalBackOptions: Options;

  departureToOptions: Options;
  departureBackOptions: Options;

  constructor(
    private customDatePipe: CustomDatePipe
  ) { }

  ngOnInit(): void {
    const originAirport = {
      to: this.airports.find(airport => this.searchSegments.to.original_origin === airport.city_code),
      back: this.airports.find(airport => this.searchSegments?.back?.original_origin === airport.city_code)
    };
    const destinationAirport = {
      to: this.airports.find(airport => this.searchSegments.to.original_destination === airport.city_code),
      back: this.airports.find(airport => this.searchSegments?.back?.original_destination === airport.city_code)
    };

    this.arrivalToOptions = {
      step: this.rangeStep,
      translate: (value: number, label: LabelType): string => {
        return this.translate(value, label, destinationAirport.to.time_zone);
      },
      floor: this.arrivalDatetime.to.min,
      ceil: this.arrivalDatetime.to.max,
    };

    this.arrivalBackOptions = {
      step: this.rangeStep,
      translate: (value: number, label: LabelType): string => {
        return this.translate(value, label, destinationAirport?.back?.time_zone);
      },
      floor: this.arrivalDatetime?.back?.min,
      ceil: this.arrivalDatetime?.back?.max,
    };

    this.departureToOptions = {
      step: this.rangeStep,
      translate: (value: number, label: LabelType): string => {
        return this.translate(value, label, originAirport.to.time_zone);
      },
      floor: this.departureDatetime.to.min,
      ceil: this.departureDatetime.to.max,
    };

    this.departureBackOptions = {
      step: this.rangeStep,
      translate: (value: number, label: LabelType): string => {
        return this.translate(value, label, originAirport?.back?.time_zone);
      },
      floor: this.departureDatetime?.back?.min,
      ceil: this.departureDatetime?.back?.max,
    };

  }

  get controls(): any {
    return this.form.controls;
  }

  private translate(value: number, label: LabelType, timezone: string): string {
    switch (label) {
      case LabelType.Low:
        return `от ${this.timestampToDatetime(value, timezone)}`;
      case LabelType.High:
        return `до ${this.timestampToDatetime(value, timezone)}`;
      default:
        return '' + this.timestampToDatetime(value, timezone);
    }
  }

  private timestampToDatetime(timestamp: number, timezone = 'Asia/Tashkent'): string {
    return this.customDatePipe.transform(timestamp * 1000, 'HH:mm, DD MMM', timezone);
  }

}
