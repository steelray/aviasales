import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '@environments/environment';
@Pipe({
  name: 'minutesToHoursMins'
})
export class MinutesToHoursMins implements PipeTransform {

  transform(mins: number): string {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    let res = `${hours} ч.`;
    if (minutes) {
      res = `${res} ${minutes} м.`;
    }
    return res;
  }

}
