import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_LIST } from '../web-api/api-list';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Country } from '../countries/countries.service';
import { CookieService } from '../cookie/cookie.service';

@Injectable()
export class AuthService {
  private storageKey = 'w_u_id';
  public user: User = null;

  constructor(private httpClient: HttpClient, private router: Router, private cookieService: CookieService) {}

  // public accountSubscription = <boolean>true;
  isSubscribed(): boolean {
    if (!!this.user) {
      return !!this.user.packages.length;
    } else {
      // this.requestCurrentSessionDataObs.subscribe();
      return false;
    }
  }

  requestLogIn(email: string, password: string) {
    return this.httpClient
      .post<SessionModelResponse>(API_LIST.login, {'email': email, 'password': password});
  }

  requestLogInWithToken(token: string) {
    return this.httpClient
      .post<SessionModelResponse>(API_LIST.loginExternal(token), {});
  }
  // tslint:disable-next-line:member-ordering
  requestCurrentSessionDataObs: Observable<User> = new Observable((observer) => {
    if (!!this.user) {
      observer.next(this.user);
    } else {
      this.requestCurrentSessionData(() => {
        observer.next(this.user);
      });
    }
  });
  // tslint:disable-next-line:member-ordering
  requestingCurrentSessionData = false;
  requestCurrentSessionData(successCallback?) {
    this.requestingCurrentSessionData = true;
    // token is injected with http interceptor
    this.httpClient.get<SessionModelResponse>(API_LIST.currentSessionData).subscribe(
      (data) => {
        this.requestingCurrentSessionData = false;
        this.user = data.user;
        localStorage.setItem('authdata', data.id);
        successCallback(data.user);
      },
      (error) => {
        if (error.status === 403 || error.status === 404) {
          this.requestingCurrentSessionData = false;
          this.deleteSessionDataAndRedirect();
        }
      }
    );
  }
  isLoggedIn() {
    if ( this.getStoredSessionData() != null) {
      return true;
    }
    return false;
  }
  storeSessionData(jsonLoginData, keepLogin) {
    // calculate expiration date from device local time
    const now = (new Date()).getTime();
    const expires_at_ms = now + (jsonLoginData.soft_expiration_timeout * 1000);

    if (keepLogin) {
      // tslint:disable-next-line:max-line-length
      this.cookieService.setCookie(this.storageKey, encodeURIComponent(JSON.stringify(new StoredSessionModel(jsonLoginData.id))), expires_at_ms );
    } else {
      this.cookieService.setCookie(this.storageKey, encodeURIComponent(JSON.stringify(new StoredSessionModel(jsonLoginData.id))), 0 );
    }
  }

  getStoredSessionData(): StoredSessionModel {
    const cookieData = this.cookieService.getCookie(this.storageKey);
    if (cookieData != null) {
      return JSON.parse(decodeURIComponent(cookieData));
    }
    return null;
  }

  deleteSessionData() {
    this.cookieService.deleteCookie(this.storageKey);
    this.user = null;
  }
  deleteSessionDataAndRedirect() {
    this.deleteSessionData();
    this.router.navigate(['/login']);
  }

  // tslint:disable-next-line:max-line-length
  registerUser(reqParams: UserRegistrationPostParams, args: UserRegistrationArgsFull | UserRegistrationArgsshort): Observable<HttpResponse<User>> {
    let queryParamsString = '';
    Object.keys(reqParams).forEach((param, i) => {
      if (reqParams[param] !== null) {
        queryParamsString += queryParamsString === '' ? '?' : '&';
        queryParamsString += param + '=' + reqParams[param];
      }
    });
    return this.httpClient.post<HttpResponse<User>>(API_LIST.registration + queryParamsString, args);
  }
  registerUserWithRemote(reqParams: UserRegistrationPostParams, successfulPath: string, failedPath: string): Observable<any> {
    let queryParamsString = '';
    Object.keys(reqParams).forEach((param, i) => {
      if (reqParams[param] !== null) {
        queryParamsString += queryParamsString === '' ? '?' : '&';
        queryParamsString += param + '=' + reqParams[param];
      }
    });
    return this.httpClient.post(API_LIST.loginRemote(reqParams.type) + queryParamsString, {
      successfulPath: successfulPath,
      failedPath: failedPath,
      acquisition: !!(<any>window).gtmTrackedCampaignSource ? (<any>window).gtmTrackedCampaignSource : null,
      acquisitionCampaign: !!(<any>window).gtmTrackedCampaignName ? (<any>window).gtmTrackedCampaignName : null
    });
  }

  sendPasswordRecoveryMail(email, redirectUrl): Observable<any> {
    return this.httpClient.post<any>(API_LIST.passwordRecovery, {email: email, url: redirectUrl + '/_KEY_'});
  }
  getPasswordRecoveryInfo(key): Observable<any> {
    return this.httpClient.get<any>(API_LIST.passwordRecoveryInfo(key));
  }
  changePassword(key, password): Observable<any> {
    return this.httpClient.patch<any>(API_LIST.passwordChange(key), {plainPassword: password});
  }

  updatePassword(oldpass: string, newpass: string) {
    return this.httpClient.patch(API_LIST.passwordUpdate, {oldPassword: oldpass, plainPassword: newpass});
  }
  updateCurrentUser(type: string, args: UserUpdateArgs): Observable<User> {
    return this.httpClient.patch<User>(API_LIST.updateCurrentUser(type), args);
  }

}

class StoredSessionModel {
  id: string;
  constructor (id: string) {
    this.id = id;
  }
}

export class User {
  id: number;
  salutation: string;
  first_name: string;
  email: string;
  last_name: string;
  state: string;
  zip_code: string;
  city: string;
  address1: string;
  address2: string;
  phone_prefix: string;
  phone1: string;
  phone2: string;
  status: number;
  packages: any[];
  country: Country;
  notifications: string[];
  register_datetime: string;
  first_subscription_datetime: string;
  refer_url_id: string;
  origin: string;
  acquisition: string;
  acquisition_campaign: string;
  balance: number;
  birth: string;
  accepted_emails: boolean;
}

class SessionModelResponse {
  id: string;
  user: User;
  last_activity: string;
  created_at: string;
  soft_expires_at: string;
  soft_expiration_timeout: string;
  hard_expires_at: string;
}

class UserRegistrationArgsFull {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  validatedEmail: boolean;
  plainPassword: string;
  acceptedEmails: boolean;
  acquisition: string;
  acquisitionCampaign: string;
  status: number;
  address1: string;
  state: string;
  zipCode: string;
  city: string;
  country: number;
  phonePrefix: string;
  phone1: string;
  birth: string;
}
class UserRegistrationArgsshort {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  validatedEmail: boolean;
  plainPassword: string;
  acceptedEmails: boolean;
  acquisition: string;
  acquisitionCampaign: string;
  status: number;
}
export class UserUpdateArgs {
  address1?: string;
  state?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  phonePrefix?: string;
  phone1?: string;
  birth?: string;
}
class UserRegistrationPostParams {
  type: string;
  referralKey: string;
  pageKey: string;
  voucher: string;
  voucherPlanId: string;
  voucherPackageIds: number[];
}

