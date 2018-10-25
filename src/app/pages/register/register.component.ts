import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansService } from '../../services/plans/plans.service';
import { CurrencyService } from '../../services/currency/currency.service';
import { AuthService } from '../../services/auth/auth.service';
import { Subscriber } from 'rxjs/Subscriber';
import { CountriesService, Country } from '../../services/countries/countries.service';
import { NgForm } from '@angular/forms';
import { OrderDetailsComponent } from '../../components/order-details/order-details.component';
import { HttpResponse, HttpEvent, HttpClient } from '@angular/common/http';
import {API_LIST} from '../../services/web-api/api-list';
import {CountriesSeparatorPipe} from '../../custom-pipes/countries-separator/countries-separator.pipe';
import * as $ from 'jquery';
import { InviteService } from '../../services/invite/invite.service';
import { UserTrackingService } from '../../services/user-tracking/user-tracking.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('od') orderDetails: OrderDetailsComponent;

  plansServiceRef: PlansService;
  currencyServiceRef: CurrencyService;
  authServiceRef: AuthService;
  selectedPlanName: string = null;
  referralKey: string = null;
  voucher: string = null;
  voucherPlanId: string = null;

  showVoucherField = false;
  triedSubmit = false;
  formErrors: string[] = [];
  formWaitingForResponse = false;
  dedicatedPackageRegistration = false;

  // form birth date selectors
  birthDateSelectors = {
    days: <number[]>[],
    months: <{label: string, value: number}[]>[],
    years: <number[]>[]
  };
  countries: Country[] = [];
  countriesServiceRef: CountriesService;

  formFields = {
    salutation: <string>'Mr',
    firstName: <string>null,
    lastName: <string>null,
    email: <string>null,
    password: <string>null,
    birthDay: <number>null,
    birthMonth: <number>null,
    birthYear: <number>null,
    phonePrefix: <string>'+44',
    phone: <string>null,
    address: <string>null,
    town: <string>null,
    postcode: <string>null,
    countryId: <number>null
  };

  constructor(
      public route: ActivatedRoute,
      plansService: PlansService,
      currencyService: CurrencyService,
      private router: Router,
      authService: AuthService,
      countriesService: CountriesService,
      private changeDetectionRef: ChangeDetectorRef,
      private httpClient: HttpClient,
      private inviteService: InviteService,
      private userTrackingService: UserTrackingService
  ) {
    if (!route.snapshot.params.plan_name) {
      if (authService.isLoggedIn()) {
        if (authService.isSubscribed()) {
          router.navigate(['/dashboard'], {queryParams: route.snapshot.queryParams});
        } else {
          router.navigate(['/pricing'], {queryParams: route.snapshot.queryParams});
        }
      } else {
        router.navigate(['/pricing'], {queryParams: route.snapshot.queryParams});
      }

      return;
    }

    if (authService.isLoggedIn()) {
      if (authService.isSubscribed()) {
        router.navigate(['/dashboard'], {queryParams: route.snapshot.queryParams});
      } else {
        router.navigate(['/subscription/' + route.snapshot.params.plan_name], {queryParams: route.snapshot.queryParams});
      }
    } else {
      this.countriesServiceRef = countriesService;
      this.plansServiceRef = plansService;
      this.selectedPlanName = route.snapshot.params.plan_name;
      this.currencyServiceRef = currencyService;
      this.authServiceRef = authService;
      // get referral id (if any) from local storage
      this.referralKey = this.inviteService.getLocalReferralId();

      if (route.snapshot.queryParams.voucher === '1') {
        this.showVoucherField = true;
      }

      if(route.snapshot.queryParams.dedicated == 'true'){
        this.dedicatedPackageRegistration = true;
      }

      // generate birthdate selectors data
      this.generateYears();
      this.generateMonths();
      this.generateDays(this.birthDateSelectors.years[0], this.birthDateSelectors.months[0].value);

      this.countriesServiceRef.reqCountries().subscribe((countries) => {
        this.countries = <Country[]>countries;

        this.formFields.countryId = 76;
      });
    }
  }

  _showPwd = false;
  _pwdType = 'password';
  _togglePwdType() {
    this._showPwd = !this._showPwd;
    this._pwdType = !this._showPwd ? 'password' : 'text';
  }

  onCountryChange(e) {
    // this.changeCountryPhoneCodeTo(this.formFields.countryId);
  }

  changeCountryPhoneCodeTo(i: number) {
    this.formFields.phonePrefix = this.countries[
        this.countriesServiceRef.indexOfCountryId(i, this.countries)].phone_prefix != null ?
        '+' + this.countries[this.countriesServiceRef.indexOfCountryId(i, this.countries)].phone_prefix : '';
  }

  generateDays(year, month) {
    const days = [];
    const daysNo = new Date(year, month, 0).getDate();
    for (let i = 1; i <= daysNo; i++) {
      days.push(i);
    }
    this.birthDateSelectors.days = days;
  }
  generateMonths() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let m = 1; m <= 12; m++ ) {
      this.birthDateSelectors.months.push({label: months[m - 1], value: m});
    }
  }
  generateYears() {
    const currentYear = (new Date).getFullYear();
    const minYear = currentYear - 130;
    const maxYear = currentYear - 18;
    for (let y = maxYear; y >= minYear; y-- ) {
      this.birthDateSelectors.years.push(y);
    }
  }
  onYearMonthChange(year, month) {
    this.generateDays(year, month);
    if (this.birthDateSelectors.days[this.birthDateSelectors.days.length - 1] < this.formFields.birthDay) {
      this.formFields.birthDay = this.birthDateSelectors.days[this.birthDateSelectors.days.length - 1];
    }
  }
  onVoucherValidation(data) {
    if (data.voucherInfo) {
      this.voucher = data.voucherInfo.code;
      this.voucherPlanId = data.voucherPlanId;
    } else {
      this.voucher = null;
      this.voucherPlanId = null;
    }
  }

  scrollToFirstError() {
    $('html, body').animate({scrollTop: $('form .ng-invalid').eq(0).offset().top - 50});
  }
  scrollToErrorMessages() {
    $('html, body').animate({scrollTop: $('form .errors-group').eq(0).offset().top - 50});
  }

  onSubmit(form) {
    this.triedSubmit = true;
    if (form.valid) {
      this.registerUser();
    } else {
      this.scrollToFirstError();
    }
  }

  registerWith(type: string) {

    let successfulPath = window.location.origin + '/login?user_session=_TOKEN_&redirect_url=/subscription/' + this.selectedPlanName;
    let queryString = '';
    Object.keys(this.route.snapshot.queryParams).forEach(key => {
      if (queryString !== '') {
        queryString += '&';
      }
      queryString += key + '=' + this.route.snapshot.queryParams[key];
    });
    if (queryString !== '') {
      successfulPath += '&qParams=' + encodeURIComponent(queryString);
    }
    this.authServiceRef.registerUserWithRemote(
        {
          type: type,
          referralKey: this.referralKey,
          pageKey: null,
          voucher: this.voucher,
          voucherPlanId: this.voucherPlanId,
          voucherPackageIds: null
        },
        successfulPath,
        window.location.origin + '/login'
    ).subscribe(
        (data: any) => {
          window.location.href = data.url;
        },
        (error) => {
          console.log(error);
        }
    );
  }
  registerUser(externalFields?) {
    this.formWaitingForResponse = true;
    this.formErrors = [];
    this.authServiceRef.registerUser({
      type: 'full',
      referralKey: this.referralKey,
      pageKey: 'regular-reg',
      voucher: this.voucher,
      voucherPlanId: this.voucherPlanId,
      voucherPackageIds: null
    }, {
      salutation: this.formFields.salutation,
      firstName: this.formFields.firstName,
      lastName: this.formFields.lastName,
      email: this.formFields.email,
      validatedEmail: false,
      plainPassword: this.formFields.password,
      phonePrefix: this.formFields.phonePrefix,
      phone1: this.formFields.phone,
      address1: this.formFields.address,
      city: this.formFields.town,
      country: this.formFields.countryId,
      zipCode: this.formFields.postcode,
      birth: this.formFields.birthYear + '-' +  this.formFields.birthMonth + '-' + this.formFields.birthDay,
      acceptedEmails: externalFields ? externalFields.fields.optInEmails : false,
      acquisition: !!(<any>window).gtmTrackedCampaignSource ? (<any>window).gtmTrackedCampaignSource : null,
      acquisitionCampaign: !!(<any>window).gtmTrackedCampaignName ? (<any>window).gtmTrackedCampaignName : null,
      status: 1
    }).subscribe(
        (data) => {
          // if the user successfully registered using a referral key, delete stored referral key
          if (this.referralKey != null) {
            this.inviteService.removeLocalReferralId();
          }
          if (this.selectedPlanName && this.plansServiceRef.isValidPlanName(this.selectedPlanName)) {
            this.authServiceRef.requestLogIn(this.formFields.email, this.formFields.password).subscribe((JsonData) => {
              this.authServiceRef.storeSessionData(JsonData, false);
              this.authServiceRef.user = JsonData.user;

              this.userTrackingService.createScript1(JsonData.user.id, JsonData.user.acquisition, JsonData.user.acquisition_campaign, JsonData.user.country);

              this.formErrors = [];

              this.httpClient.post<any>(API_LIST.makePayment(
                  this.plansServiceRef.plans[this.selectedPlanName].planVars.packagePriceId,
                      window.location.origin + '/payment-status' ),
                  {}
              ).subscribe((res) => {
                    let paymentStarter = () => {
                      this.formWaitingForResponse = false;
                      window.location.href = res.gateway_url;
                    };

                    if ((<any>window).EventRefresher) {
                      let paymentStarted = false;

                      (<any>window).EventRefresher.refresh(() => {
                        paymentStarted = true;
                        paymentStarter();
                      });

                      setTimeout(() => {
                        if (!paymentStarted) {
                          paymentStarter();
                        }
                      }, 10000);
                    } else {
                      paymentStarter();
                    }
                  },
                  (err) => {
                    console.log(err);
                    this.formErrors.push(err.error.string);
                    this.formWaitingForResponse = false;
                  }
              );

            });
          } else {
            // case of simple registration
            this.authServiceRef.requestLogIn(this.formFields.email, this.formFields.password).subscribe((JsonData) => {
              this.authServiceRef.storeSessionData(JsonData, false );
              this.router.navigate(['/pricing']);
            });
          }
        },
        (err) => {
          this.formWaitingForResponse = false;
          switch (err.status) {
            case 400:
              this.formErrors.push(err.error.string);
              break;
            case 422:
              err.error.errors.forEach(element => {
                if (element.field !== '') {
                  this.formErrors.push(element.field + ': ' + element.message);
                } else {
                  this.formErrors.push(element.message);
                }
              });
              break;
            case 500:
              this.formErrors.push('Internal Server Error');
              break;
          }
          setTimeout(() => {
            this.scrollToErrorMessages();
          });
        }
    );
  }
  ngOnInit() {
    this.changeDetectionRef.detectChanges();
  }
}
