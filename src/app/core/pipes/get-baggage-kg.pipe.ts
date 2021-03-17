import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'getBaggageHandbagInfo'
})
export class GetBaggageHandbagInfoPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) {
      return 'x';
    }
    // value = '2PC10';
    const splited = value.split('PC');
    const placeCount = splited[0];
    // if value like "1PCx36x30x27", not included
    const kg = splited[1] && splited[1].includes('x') ? null : splited[1];
    if (!kg) {
      return 'x';
    }
    const res = placeCount > 1 ? `x${placeCount}` : kg;
    return res;
  }

}
