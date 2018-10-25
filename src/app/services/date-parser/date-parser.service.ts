import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateParserService {
  static parse(dateInput: any): number|null {
    if (!dateInput) {
      return null;
    }

    let microtime = Date.parse(dateInput);

    if (!microtime || isNaN(microtime)) { // for Safari browser
      const a: string[] = dateInput.split(/[^0-9]/);
      const d: Date = new Date(Number(a[0]), Number(a[1]) - 1, Number(a[2]), Number(a[3]), Number(a[4]), Number(a[5]), 0);
      microtime = d.getTime();
    }

    return microtime;
  }
}
