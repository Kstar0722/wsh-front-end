import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CurrencyService {

  private availableCurrencies: Currency[] = [
    {name: 'GBP', symbol: '&pound;', partSymbol: 'p'},
    {name: 'EUR', symbol: '&euro;', partSymbol: 'c'},
    {name: 'USD', symbol: '$', partSymbol: 'c'},
    {name: 'AUD', symbol: '$', partSymbol: 'c'},
    {name: 'CAD', symbol: '$', partSymbol: 'c'},
    {name: 'NZD', symbol: '$', partSymbol: 'c'},
    {name: 'ZAR', symbol: 'R', partSymbol: 'c'}
  ];

  public selectedCurrency: string = null;

  // set this to "true" to activate / show Header Currency Selector
  showCurrencySelector = false;


  private localStorageKey = 'selectedCurrency';

  constructor() {
    if ( !this.showCurrencySelector && !!localStorage.getItem(this.localStorageKey)) {
      localStorage.removeItem(this.localStorageKey);
    }
    if ( !localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, this.getAvailableCurrencies()[0].name );
    }
    this.selectedCurrency = localStorage.getItem(this.localStorageKey);
  }

  // generate observables for each currency selector component that may change
  public currencyObservables: Observable<string>[] = [];
  public addCurrencyObservable(nativeElem) {
    this.currencyObservables.push(
      new Observable((observer) => {
        nativeElem.addEventListener('change', (e) => {
          observer.next(this.selectedCurrency);
        });
      })
    );
  }

  public subscribeToCurrencyChanges(callback) {
    this.currencyObservables.forEach((observable, index) => {
      observable.subscribe((data) => {
        callback(data);
      });
    });
  }

  getAvailableCurrencies(): Currency[] {
    return this.availableCurrencies;
  }
  getAvailableCurrenciesNames(): string[] {
    const availableCurrencies = this.getAvailableCurrencies();
    const currenciesNames: string[] = [];
    availableCurrencies.forEach((currency, i) => {
      currenciesNames.push(currency.name);
    });
    return currenciesNames;
  }

  getCurrencySymbolForName(currencyName): string {
    let currencyIndex = null;
    const availableCurrencies = this.getAvailableCurrencies();
    availableCurrencies.forEach((currency, i) => {
      if (currencyName === currency.name) {
        currencyIndex = i;
      }
    });
    if (currencyIndex == null) {
      return null;
    }
    return availableCurrencies[currencyIndex].symbol;
  }

  getCurrencyObjWhereNameIs(currencyName: string): Currency {
    let currencyIndex = null;
    const availableCurrencies = this.getAvailableCurrencies();
    availableCurrencies.forEach((currency, i) => {
      if (currencyName === currency.name) {
        currencyIndex = i;
      }
    });
    if (currencyIndex == null) {
      return null;
    }
    return availableCurrencies[currencyIndex];
  }

  setSelectedCurrency(value): void {
    localStorage.setItem(this.localStorageKey, value);
    this.selectedCurrency = value;
  }

  getSelectedCurrency(): string {
    return this.selectedCurrency;
  }
}
export class Currency {
  name: string;
  symbol: string;
  partSymbol: string;
}
