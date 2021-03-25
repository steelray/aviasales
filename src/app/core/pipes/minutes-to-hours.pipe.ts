import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
@Pipe({
  name: 'minutesToHoursMins'
})
export class MinutesToHoursMins implements PipeTransform {

  constructor(
    private translateService: TranslateService
  ) { }

  transform(mins: number): string {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    let res = `${hours} ${this.translateService.instant('HOUR')}`;
    if (minutes) {
      res = `${res} ${minutes} ${this.translateService.instant('MIN')}`;
    }
    return res;
  }

}
