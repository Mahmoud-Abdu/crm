import { Pipe, PipeTransform } from '@angular/core';
import { Deal } from '../deals/deal.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(deals: Deal[], filterText: string) {
    if (deals.length === 0 || filterText === '') return deals;
    else {
      return deals.filter((deal) => {
        return (
          deal.first_name
            .toLocaleLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          deal.last_name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) ||
          deal.email.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
        );
      });
    }
  }
}
