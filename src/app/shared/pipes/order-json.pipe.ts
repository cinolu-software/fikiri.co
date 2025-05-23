import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderJSON'
})
export class OrderJSONPipe implements PipeTransform {
  transform(items: Record<string, string>, order: string[]): { key: string; value: string }[] {
    return order.map((key) => ({ key, value: items[key] })).filter((item) => item.value !== undefined);
  }
}
