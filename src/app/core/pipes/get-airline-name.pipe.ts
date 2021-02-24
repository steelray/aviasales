import { Pipe, PipeTransform } from '@angular/core';
import { IAirline, IAirport } from '@core/interfaces/search.interfaces';
@Pipe({
  name: 'getAirlineName'
})
export class GetAirlineNamePipe implements PipeTransform {

  transform(iata: string, airlines: IAirline[]): string {
    const airline = airlines.find(item => item.iata === iata);
    if (airline) {
      return airline.name;
    }
    return iata;
  }

}
