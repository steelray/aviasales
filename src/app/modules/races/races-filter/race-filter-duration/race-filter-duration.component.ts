import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IAirport, IMinMaxValues, ISearchResultFilterArrivalDateTime, ISearchResultSegments } from '@core/interfaces/search.interfaces';
import { minutesToTime } from '@core/utils/minutes-to-time.util';

@Component({
  selector: 'app-race-filter-duration',
  templateUrl: './race-filter-duration.component.html',
  styleUrls: ['./race-filter-duration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceFilterDurationComponent implements OnInit {
  @Input() flightsDuration: ISearchResultFilterArrivalDateTime;
  @Input() form: FormGroup;
  @Input() airports: IAirport[];
  @Input() searchSegments: ISearchResultSegments;


  constructor() { }
  optionsTo: Options;
  optionsBack: Options;
  defaultOptions: Options = {
    step: 10, // in minutes
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return `от ${this.minutesToHourseMinutes(value)}`;
        case LabelType.High:
          return `до ${this.minutesToHourseMinutes(value)}`;
        default:
          return '' + this.minutesToHourseMinutes(value);
      }
    }
  };

  ngOnInit(): void {
    this.optionsTo = {
      floor: this.flightsDuration.to.min,
      ceil: this.flightsDuration.to.max,
      ...this.defaultOptions
    };
    if (this.searchSegments.back) {
      this.optionsBack = {
        floor: this.flightsDuration.back.min,
        ceil: this.flightsDuration.back.max,
        ...this.defaultOptions
      };
    }
  }

  private minutesToHourseMinutes(mins: number): string {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  }

}
