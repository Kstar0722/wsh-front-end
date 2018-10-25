import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_LIST } from '../web-api/api-list';
import { CurrencyService } from '../currency/currency.service';
import { DateParserService } from '../date-parser/date-parser.service';

@Injectable()
export class JackpotsService {

  private currencyServiceRef: CurrencyService;
  jackpotsSumNormalized: JackpotsSumNormalizedModel = new JackpotsSumNormalizedModel();
  jackpotsNormalized: JackpotsNormalizedModel = new JackpotsNormalizedModel();

  constructor(private httpClient: HttpClient, currencyService: CurrencyService) {
    this.currencyServiceRef = currencyService;
    this.getJackpotsSum(this.currencyServiceRef.getSelectedCurrency());
    this.getJackpotsList(this.currencyServiceRef.getSelectedCurrency());
  }

  public getJackpotsSum(currency) {
    this.jackpotsSumNormalized.isLoading = true;
    this.httpClient.get<JackpotsSumResponseModel>(API_LIST.jackpotsSum + '/' + currency).subscribe((data) => {
      this.jackpotsSumNormalized = this.normalizeJackpotSum(data);
      this.jackpotsSumNormalized.isLoading = false;
    });
  }
  public normalizeJackpotSum(response: JackpotsSumResponseModel): JackpotsSumNormalizedModel {
    return {
      sum: response.sum,
      // tslint:disable-next-line:radix
      sumFormated: this.formatAmount( parseInt( response.sum ) ),
      sumFormatedDigits: this.formatAmount(parseFloat(response.sum)).value.split(''),
      currencySymbol: this.currencyServiceRef.getCurrencySymbolForName(response.currency),
      isLoading: true
    };
  }

  // jackpots list
  public getJackpotsList(currency) {
    this.jackpotsNormalized.isLoading = true;
    this.httpClient.get<JackpotResponseSingleModel[]>(API_LIST.jackpotsList + '/' + currency).subscribe((data) => {
      this.jackpotsNormalized = this.normalizeJackpotList(data);
      this.jackpotsNormalized.isLoading = false;
    });
  }

  public normalizeJackpotList(jackpotResponseSingleArr: JackpotResponseSingleModel[]): JackpotsNormalizedModel {
    const jackpotsNormalized: JackpotsNormalizedModel = new JackpotsNormalizedModel();

    jackpotResponseSingleArr.forEach((jackpotResponseSingle, i) => {
      if (!jackpotsNormalized.lotteries[jackpotResponseSingle.lottery_type]) {
        return;
      }

      Object.assign(jackpotsNormalized.lotteries[jackpotResponseSingle.lottery_type], jackpotResponseSingle);

      // tslint:disable-next-line:max-line-length
      jackpotsNormalized.lotteries[jackpotResponseSingle.lottery_type].draw_datetime_expanded = this.normalizeDateTime(jackpotResponseSingle.draw_datetime);

      jackpotsNormalized.lotteries[jackpotResponseSingle.lottery_type].order = null;
      // tslint:disable-next-line:max-line-length
      jackpotsNormalized.lotteries[jackpotResponseSingle.lottery_type].currencySymbol = this.currencyServiceRef.getCurrencySymbolForName(jackpotResponseSingle.currency);

      jackpotsNormalized.lotteries[jackpotResponseSingle.lottery_type].amount_formated = this.formatAmount(jackpotResponseSingle.amount);
    });

    // sort by amount
    const tempVal = 0;
    const keysArr = Object.keys(jackpotsNormalized.lotteries);

    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < keysArr.length - 1; i++) {
            if (jackpotsNormalized.lotteries[keysArr[i]].amount < jackpotsNormalized.lotteries[keysArr[i + 1]].amount) {
              const temp = keysArr[i];
                keysArr[i] = keysArr[i + 1];
                keysArr[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);

    keysArr.forEach((key, i) => {
      jackpotsNormalized.lotteries[key].order = i + 1;
    });

    return jackpotsNormalized;
  }

  public formatAmount(amount: number): FormatedAmount {
    let unit: string;
    let value: string;

    if (amount >= 1000000000) {
      unit = 'billion';
      value = (amount / 1000000000).toFixed(3);
    } else if (amount >= 1000000) {
      unit = 'million';
      value = (amount / 1000000).toFixed(3);
    } else if (amount >= 1000) {
      unit = 'thousand';
      value = (amount / 1000).toFixed(3);
    } else {
      unit = '';
      value = amount.toFixed(3);
    }

    value = value.slice(0, -2).replace(/\.0$/, '');

    return { value: value, unit: unit };
  }

  public normalizeDateTime(value: string): DateTimeNormalizedModel {
    // tslint:disable-next-line:max-line-length
    const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const normalizedDateTime = new DateTimeNormalizedModel();
    const dateObj = new Date(this.dateParse(value));
    normalizedDateTime.year = dateObj.getFullYear();
    normalizedDateTime.month = months[dateObj.getMonth()];
    normalizedDateTime.weekday = days[dateObj.getDay()];
    normalizedDateTime.day = ('0' + dateObj.getDate()).slice(-2);
    normalizedDateTime.hour = ('0' + dateObj.getHours()).slice(-2);
    normalizedDateTime.minute = ('0' + dateObj.getMinutes()).slice(-2);
    return normalizedDateTime;
  }

  private dateParse(value: string): number {
    return DateParserService.parse(value);
  }
}

export class JackpotResponseSingleModel {
  lottery_type: any = '';
  lottery_name: any = '';
  draw_datetime: any = '';
  draw_timestamp: any = '0';
  amount: any = 0;
  image: any = '';
  currency: any = '';
  formatted: any = '';
}

class JackpotNormalizedSingleModel {
  lottery_type: any = '';
  lottery_name: any = '';
  draw_datetime_expanded: DateTimeNormalizedModel = new DateTimeNormalizedModel();
  draw_timestamp: any = '0';
  amount: any = 0;
  amount_formated: FormatedAmount = {unit: '', value: '0'};
  image: any = '';
  currency: any = '';
  formatted: any = '';
  currencySymbol: any = '';
  order: any = 1;
}

export class JackpotsNormalizedModel {
  // list of lottery types
  isLoading: boolean = null;
  lotteries = {
    euromillions: new JackpotNormalizedSingleModel(),
    megamillions: new JackpotNormalizedSingleModel(),
    powerball: new JackpotNormalizedSingleModel()
  };
}

class FormatedAmount {
  unit: string;
  value: string;
}

class DateTimeNormalizedModel {
  year: any = 0;
  month: any = '';
  weekday: any = '';
  day: any = 0;
  hour: any = 0;
  minute: any = 0;
}

export class JackpotsSumResponseModel {
  sum: string;
  currency: string;
}
export class JackpotsSumNormalizedModel {
  sum: string = null;
  sumFormated: FormatedAmount = {value: '0', unit: ''};
  sumFormatedDigits: string[] = [];
  currencySymbol: string = null;
  isLoading: boolean = null;
}

