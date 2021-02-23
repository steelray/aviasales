import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'customNumber'
})
export class CustomNumber implements PipeTransform {

  transform(str: string): string {
    return str.split(',').join(' ');
  }

}
