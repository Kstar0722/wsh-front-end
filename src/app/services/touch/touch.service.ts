import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TouchService {
  mobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    }
  };
  isAnyMobile() {
    return !!(this.mobile.Android() || this.mobile.BlackBerry() || this.mobile.iOS() || this.mobile.Opera() || this.mobile.Windows());
  }
  constructor() { }
}
