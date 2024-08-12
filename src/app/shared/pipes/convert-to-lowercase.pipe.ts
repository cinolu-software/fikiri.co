import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToLowercase',
  standalone: true
})
export class ConvertToLowercasePipe implements PipeTransform {
  transform(value: string): unknown {
    const valueArray = value.split(' ');
    return valueArray.map((word) => word.toLowerCase()).join(' ');
  }
}
