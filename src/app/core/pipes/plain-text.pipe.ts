import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'plainText'
})
export class PlainTextPipe implements PipeTransform {
  transform(
    value: string
  ): string {
    return value.replace(/<[^>]*>/g, '');
  }
}
