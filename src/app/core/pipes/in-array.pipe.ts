import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inArray'
})
export class InArrayPipe implements PipeTransform {

  /*
    * if searchKey passed, array is objects array
  */
  transform(value: string | number, arr: any[], searchKey = null): boolean {
    if (searchKey) {
      return !!arr.find(item => item[searchKey] === value);
    }

    return arr.includes(value);
  }

}