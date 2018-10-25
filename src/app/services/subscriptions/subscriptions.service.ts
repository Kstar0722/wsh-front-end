import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_LIST } from '../../services/web-api/api-list';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(public authService: AuthService, private httpClient: HttpClient) { }
  cancelSubscription() {
    return new Observable((observer) => {
      this.httpClient.patch(API_LIST.updateSubscriptionData, {autoRenewal: false}).subscribe(
        (data: any) => {
          this.authService.user.packages = [data];
          observer.next(data);
        },
        (e: HttpErrorResponse) => {
          observer.error(e);
        }
      );
    });
  }
  activateAutoRenewal() {
    return new Observable((observer) => {
      this.httpClient.patch(API_LIST.updateSubscriptionData, {autoRenewal: true}).subscribe(
        (data: any) => {
          this.authService.user.packages = [data];
          observer.next(data);
        },
        (e: HttpErrorResponse) => {
          console.log(e.error);
          observer.error(e);
        }
      );
    });
  }
  changeSubscriptionPlanTo(planId: number) {
    return new Observable((observer) => {
      this.httpClient.patch(API_LIST.updateSubscriptionData, {extendToGroupId: planId}).subscribe(
        (data: any) => {
          this.authService.user.packages = [data];
          observer.next(data);
        },
        (e: HttpErrorResponse) => {
          console.log(e.error);
          observer.error(e);
        }
      );
    });
  }

  smsCancelSubscription(fullPhoneNumber) {
    const body = {
      phonePrefix: fullPhoneNumber.phone_prefix,
      phone: fullPhoneNumber.phone_number
    };
    return new Observable((observer) => {
      this.httpClient.post(API_LIST.smsUnsubscribe, body).subscribe(
        (data: any) => {
          observer.next(data);
        },
        (e: HttpErrorResponse) => {
          observer.error(e);
        }
      );
    });
  }

}
