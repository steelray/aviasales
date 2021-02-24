import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { minutesToTime } from '@core/utils/minutes-to-time.util';
import { IAirport, IMinMaxValues, ISearchResultFilterArrivalDateTime, ISearchResultFilterTime, ISearchResultSegments } from '@core/interfaces/search.interfaces';
import * as moment from 'moment';
@Component({
  selector: 'app-races-filter-travel-time',
  templateUrl: './races-filter-travel-time.component.html',
  styleUrls: ['./races-filter-travel-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RacesFilterTravelTimeComponent implements OnInit {
  form: FormGroup;
  @Input() searchSegments: ISearchResultSegments;
  @Input() arrivalDatetime: ISearchResultFilterArrivalDateTime;
  @Input() departureMinutes: ISearchResultFilterArrivalDateTime;
  @Input() airports: IAirport[];

  arrivalDefaultOptions: Options = {
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

    console.log(this.airports);

    this.departureToOptions = {
      floor: this.departureMinutes.to.min,
      ceil: this.departureMinutes.to.max,
      step: 10, // in minutes
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return `от ${minutesToTime(value)}, ${moment(this.searchSegments.to.date).format('DD MMM')}`;
          case LabelType.High:
            return `до ${minutesToTime(value)}, ${moment(this.searchSegments.to.date).format('DD MMM')}`;
          default:
            return '' + minutesToTime(value);
        }
      }
    };

    this.departureBackOptions = {
      floor: this.departureMinutes.back.min,
      ceil: this.departureMinutes.back.max,
      step: 10, // in minutes
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return `от ${minutesToTime(value)}, ${moment(this.searchSegments.back.date).format('DD MMM')}`;
          case LabelType.High:
            return `до ${minutesToTime(value)}, ${moment(this.searchSegments.back.date).format('DD MMM')}`;
          default:
            return '' + minutesToTime(value);
        }
      }
    };

    this.arrivalToOptions = {
      ...this.arrivalDefaultOptions, ...{
        floor: this.arrivalDatetime.to.min,
        ceil: this.arrivalDatetime.to.max,
      }
    };

    this.arrivalBackOptions = {
      ...this.arrivalDefaultOptions, ...{
        floor: this.arrivalDatetime.back.min,
        ceil: this.arrivalDatetime.back.max,
      }
    };

    // console.log(this.timestampToDatetime(this.arrivalDatetime.to.min));
    // console.log(minutesToTime(this.departureMinutes.to.min));
    // console.log(minutesToTime(this.departureMinutes.back.min));
    // console.log(minutesToTime(this.departureMinutes.back.max));

    this.form = this.fb.group({
      to: this.fb.group({
        departure: [''],
        arrival: ['']
      }),
      back: this.fb.group({
        departure: [''],
        arrival: ['']
      })
    });
    this.form.valueChanges.subscribe(res => {
      // console.log(res);
    });
  }

  get controls(): any {
    return this.form.controls;
  }

  private timestampToDatetime(timestamp: number): string {
    return moment(timestamp * 1000).format('HH:mm, DD MMM');
  }

  private timeToMinutes(time: string, splitter = ':'): number {
    const timeArr = time.split(splitter);
    if (timeArr.length < 2) {
      return;
    }
    return (+timeArr[0] * 60) + (+timeArr[1]);
  }

}
