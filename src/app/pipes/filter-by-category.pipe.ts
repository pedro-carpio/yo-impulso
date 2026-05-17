import { Pipe, PipeTransform } from '@angular/core';

interface CategorizedItem {
  category: string;
}

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterByCategoryPipe implements PipeTransform {
  transform<T extends CategorizedItem>(items: T[], category: string): T[] {
    if (!items || !category) {
      return items;
    }
    return items.filter(item => item.category === category);
  }
}
