import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  setCookie(cname, cvalue, expiration_ms) {
    const d = new Date();
    d.setTime(d.getTime() + expiration_ms);
    const expires = 'expires=' + d.toUTCString();
    if (expiration_ms > 0) {
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    } else {
      document.cookie = cname + '=' + cvalue + ';path=/';
    }

  }
  getCookie(cname) {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }
  deleteCookie(cname) {
    const d = new Date(0);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=;' + expires + ';path=/';
  }
}
