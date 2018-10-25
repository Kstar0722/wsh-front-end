import { Injectable } from '@angular/core';

import { API_LIST } from '../web-api/api-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CountriesService {

  constructor(private httpClient: HttpClient) {}

  reqCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(API_LIST.countries);
  }
  indexOfCountryId(id, countries: Country[]): number {
    let index = -1;
    countries.forEach((country, i) => {
      if (id === country.id) {
        index = i;
      }
    });
    return index;
  }
}

export class Country {
  id: string;
  name: string;
  code: string;
  order: number;
  phone_prefix: string;
  constructor (id: string, name: string, code: string, order: number, phone_prefix: string) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.order = order;
    this.phone_prefix = phone_prefix;
  }
}
