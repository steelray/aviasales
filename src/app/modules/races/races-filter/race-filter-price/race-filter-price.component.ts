import { LabelType, Options } from '@angular-slider/ngx-slider';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IMinMaxValues } from '@core/interfaces/search.interfaces';

@Component({
  selector: 'app-race-filter-price',
  templateUrl: './race-filter-price.component.html',
  styleUrls: ['./race-filter-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceFilterPriceComponent implements OnInit {
  @Input() price: IMinMaxValues;
  constructor(
    private decimalPipe: DecimalPipe
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
            return `от ${this.formatNumber(value)}`;
          case LabelType.High:
            return `до ${this.formatNumber(value)}`;
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
