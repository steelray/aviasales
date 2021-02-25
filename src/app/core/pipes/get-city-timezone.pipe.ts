import { Pipe, PipeTransform } from '@angular/core';
import { IAirport } from '@core/interfaces/search.interfaces';
@Pipe({
  name: 'getCityTimeZone'
})
export class GetCityTimeZonePipe implements PipeTransform {

  transform(airportIata: string, airports: IAirport[]): string {
    const airport = airports.find(item => item.iata === airportIata);
    return airport ? airport.time_zone : 'Asia/Tashkent';
  }

}
