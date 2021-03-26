import { LabelType, Options } from '@angular-slider/ngx-slider';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { APP_LANGS } from '@core/const/app-langs.const';
import { IMinMaxValues } from '@core/interfaces/search.interfaces';
import { getLangFromParams } from '@core/utils/get-lang.util';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-race-filter-price',
  templateUrl: './race-filter-price.component.html',
  styleUrls: ['./race-filter-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceFilterPriceComponent implements OnInit {
  @Input() price: IMinMaxValues;
  @Input() control = new FormControl();
  currentLang = getLangFromParams();
  constructor(
    private decimalPipe: DecimalPipe,
    private translateService: TranslateService
  ) { }
  options: Options;
  ngOnInit(): void {
    this.options = {
      floor: this.price.min,
      ceil: this.price.max,
      step: 10, // in minutes
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return this.currentLang !== APP_LANGS.uz
              ? `${this.translateService.instant('FROM_DATE')} ${this.formatNumber(value)}`
              : `${this.formatNumber(value)} ${this.translateService.instant('FROM_DATE')} `;
          case LabelType.High:
            return this.currentLang !== APP_LANGS.uz
              ? `${this.translateService.instant('TO_DATE')} ${this.formatNumber(value)}`
              : `${this.formatNumber(value)} ${this.translateService.instant('TO_DATE')}`;
          default:
            return '' + this.formatNumber(value);
        }
      }
    };
  }

  private formatNumber(amount: number): string {
    return `${this.decimalPipe.transform(amount).split(',').join(' ')} UZS`;
  }

}
