import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'transferCount'
})
export class TransferCount implements PipeTransform {

  transform(racesLength: number): string {
    const transfersCount = racesLength - 1;
    let transfer = 'пересадка';
    if (transfersCount > 1 && transfersCount < 5) {
      transfer = 'пересадки';
    } else if (transfersCount > 4) {
      transfer = 'пересадок';
    }
    return `${transfersCount} ${transfer}`;
  }

}
