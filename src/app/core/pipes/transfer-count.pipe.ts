import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'transferCount'
})
export class TransferCount implements PipeTransform {

  transform(racesLength: number): string {
    return `${racesLength - 1} пересадка`;
  }

}
