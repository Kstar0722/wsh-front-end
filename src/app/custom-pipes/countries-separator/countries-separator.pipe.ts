import { Pipe, PipeTransform } from '@angular/core';
import {Country} from '../../services/countries/countries.service'

@Pipe({
  name: 'countriesSeparator'
})
export class CountriesSeparatorPipe implements PipeTransform {

  transform(countries: Country[], args?: any): Country[] {
    let result = <Country[]>[];
    if (!!countries.length) {
      let prevOrder: number = countries[0].order;
      countries.forEach((country)=>{
        if(country.order != prevOrder){
          result.push(new Country('-1', '--------------------------', '-1', -1, '-1'));
          prevOrder = country.order;
        }
        result.push(country);
      });
    }
    
    return result;
  }

}
