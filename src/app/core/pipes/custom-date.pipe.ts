import { Pipe, PipeTransform } from '@angular/core';
import 'moment-timezone/builds/moment-timezone-with-data-2012-2022';
import * as moment from 'moment';
@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(date: number, format: string, timezone: string): string {
    const momentLib: any = moment;
    // console.log(new Date(date));
    return momentLib(date).tz(timezone).format(format);
  }

}
