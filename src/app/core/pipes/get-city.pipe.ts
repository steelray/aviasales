import { Pipe, PipeTransform } from '@angular/core';
import { IAirport } from '@core/interfaces/search.interfaces';
@Pipe({
  name: 'getCity'
})
export class GetCityPipe implements PipeTransform {

  transform(iata: string, airports: IAirport[], nameCase: string): string {
    const city = airports.find(item => item.city_code === iata);
    if (city) {
      if (nameCase && city.cases[nameCase]) {
        return city.cases[nameCase];
      }
      return city.city;
    }
    return iata;
  }

}
