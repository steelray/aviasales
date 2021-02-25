import { Pipe, PipeTransform } from '@angular/core';
import { IAirport } from '@core/interfaces/search.interfaces';
@Pipe({
  name: 'getAirportName'
})
export class GetAirportNamePipe implements PipeTransform {

  transform(iata: string, airports: IAirport[]): string {
    const airport = airports.find(item => item.iata === iata);
    return airport ? airport.name : iata;
  }

}
