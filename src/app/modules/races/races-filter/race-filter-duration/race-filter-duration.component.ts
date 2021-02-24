import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IMinMaxValues } from '@core/interfaces/search.interfaces';
import { minutesToTime } from '@core/utils/minutes-to-time.util';

@Component({
  selector: 'app-race-filter-duration',
  templateUrl: './race-filter-duration.component.html',
  styleUrls: ['./race-filter-duration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceFilterDurationComponent implements OnInit {
  @Input() flightsDuration: IMinMaxValues;
  constructor() { }
  options: Options;
  ngOnInit(): void {
    this.options = {
      floor: this.flightsDuration.min,
      ceil: this.flightsDuration.max,
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
  }

  private minutesToHourseMinutes(mins: number): string {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  }

}
