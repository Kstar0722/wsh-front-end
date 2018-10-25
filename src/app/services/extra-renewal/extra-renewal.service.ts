
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_LIST } from '../../services/web-api/api-list';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExtraRenewalService {

  constructor(public authService: AuthService, private httpClient: HttpClient) { }
  getRenewalState() {
    return new Observable((observer) => {
      this.httpClient.get(API_LIST.getrenewal).subscribe(
        (data: any) => {
          observer.next(data);
        },
        (e: HttpErrorResponse) => {
          observer.error(e);
        }
      );
    });
  }
  cancelAutoRenewal() {
    return new Observable((observer) => {
      this.httpClient.patch(API_LIST.cancelrenewal, {autoRenewal: false}).subscribe(
        (data: any) => {
          observer.next(data);
        },
        (e: HttpErrorResponse) => {
          console.log(e.error);
          observer.error(e);
        }
      );
    });
  }
}
