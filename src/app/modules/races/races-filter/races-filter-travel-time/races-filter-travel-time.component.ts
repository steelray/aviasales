import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { minutesToTime } from '@core/utils/minutes-to-time.util';
import { IAirport, IMinMaxValues, ISearchResultFilterArrivalDateTime, ISearchResultFilterTime, ISearchResultSegments } from '@core/interfaces/search.interfaces';
import * as moment from 'moment';
import 'moment/min/locales';

@Component({
  selector: 'app-races-filter-travel-time',
  templateUrl: './races-filter-travel-time.component.html',
  styleUrls: ['./races-filter-travel-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RacesFilterTravelTimeComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() searchSegments: ISearchResultSegments;
  @Input() arrivalDatetime: ISearchResultFilterArrivalDateTime;
  @Input() departureDatetime: ISearchResultFilterArrivalDateTime;
  @Input() airports: IAirport[];

  DefaultOptions: Options = {
    step: 600, // in seconds(10 minutes)
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return `от ${this.timestampToDatetime(value)}`;
        case LabelType.High:
          return `до ${this.timestampToDatetime(value)}`;
        default:
          return '' + this.timestampToDatetime(value);
      }
    }
  };


  arrivalToOptions: Options;
  arrivalBackOptions: Options;

  departureToOptions: Options;
  departureBackOptions: Options;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.arrivalToOptions = {
      ...this.DefaultOptions, ...{
        floor: this.arrivalDatetime.to.min,
        ceil: this.arrivalDatetime.to.max,
      }
    };

    this.arrivalBackOptions = {
      ...this.DefaultOptions, ...{
        floor: this.arrivalDatetime.back.min,
        ceil: this.arrivalDatetime.back.max,
      }
    };

    this.departureToOptions = {
      ...this.DefaultOptions, ...{
        floor: this.departureDatetime.to.min,
        ceil: this.departureDatetime.to.max,
      }
    };

    this.departureBackOptions = {
      ...this.DefaultOptions, ...{
        floor: this.departureDatetime.back.min,
        ceil: this.departureDatetime.back.max,
      }
    };

  }

  get controls(): any {
    return this.form.controls;
  }

  private timestampToDatetime(timestamp: number): string {
    return moment(timestamp * 1000).locale('ru').format('HH:mm, DD MMM');
  }

  private timeToMinutes(time: string, splitter = ':'): number {
    const timeArr = time.split(splitter);
    if (timeArr.length < 2) {
      return;
    }
    return (+timeArr[0] * 60) + (+timeArr[1]);
  }

}
