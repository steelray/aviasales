import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { APP_LANGS } from '@core/const/app-langs.const';
import { IAirport, IMinMaxValues, ISearchResultFilterArrivalDateTime, ISearchResultSegments } from '@core/interfaces/search.interfaces';
import { getLangFromParams } from '@core/utils/get-lang.util';
import { minutesToTime } from '@core/utils/minutes-to-time.util';
import { TranslateService } from '@ngx-translate/core';

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
  currentLang = getLangFromParams();

  constructor(
    private translateService: TranslateService
  ) { }
  optionsTo: Options;
  optionsBack: Options;
  defaultOptions: Options = {
    step: 10, // in minutes
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return this.currentLang !== APP_LANGS.uz
            ? `${this.translateService.instant('FROM_DATE')} ${this.minutesToHourseMinutes(value)}`
            : `${this.minutesToHourseMinutes(value)} ${this.translateService.instant('FROM_DATE')}`;
        case LabelType.High:
          return this.currentLang !== APP_LANGS.uz
            ? `${this.translateService.instant('TO_DATE')} ${this.minutesToHourseMinutes(value)}`
            : `${this.minutesToHourseMinutes(value)} ${this.translateService.instant('TO_DATE')} `;
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
    return `${hours}${this.translateService.instant('HOUR')} ${minutes}${this.translateService.instant('MIN')}`;
  }

}
