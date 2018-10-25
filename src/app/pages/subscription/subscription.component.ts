import { Component, OnInit, ViewChild } from '@angular/core';
import { PlansService } from '../../services/plans/plans.service';
import { CurrencyService } from '../../services/currency/currency.service';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UpdateUserFormComponent } from '../../components/update-user-form/update-user-form.component';
import { NgForm } from '@angular/forms';
import { OrderDetailsComponent } from '../../components/order-details/order-details.component';
import { API_LIST } from '../../services/web-api/api-list';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  @ViewChild ('od') orderDetails: OrderDetailsComponent;
  @ViewChild ('uu') uu: UpdateUserFormComponent;

  plansServiceRef: PlansService;
  currencyServiceRef: CurrencyService;
  authServiceRef: AuthService;

  selectedPlanName: string;
  selectedOffer: string;

  makePaymentWaiting = false;
  showVoucherField = false;
  errors = [];

  constructor(
    route: ActivatedRoute,
    plansService: PlansService,
    currencyService: CurrencyService,
    authService: AuthService,
    private httpClient: HttpClient
  ) {
    this.plansServiceRef = plansService;
    this.currencyServiceRef = currencyService;
    this.authServiceRef = authService;
    this.selectedPlanName = route.snapshot.params.plan_name;
    if (route.snapshot.queryParams.voucher === '1') {
      this.showVoucherField = true;
    }
  }
  submitAggreementsForm() {
    this.orderDetails.aggreementsForm.ngSubmit.emit();
  }

  goToPayment() {
    this.errors = [];
    this.makePaymentWaiting = true;
    this.httpClient.post<any>(
      API_LIST.makePayment(
        this.plansServiceRef.plans[this.selectedPlanName].planVars.packagePriceId, window.location.origin + '/payment-status' ), {}
      ).subscribe(
      (data) => {
        this.makePaymentWaiting = false;
        window.location.href = data.gateway_url;
      },
      (err) => {
        console.log(err);
        this.errors.push(err.error.string);
        this.makePaymentWaiting = false;
      }
    );
  }

  needsProfileUpdate() {
    if (
      this.profileNeedsFirstLastName() ||
      this.authServiceRef.user.birth == null ||
      this.authServiceRef.user.first_name == null ||
      this.authServiceRef.user.last_name == null ||
      this.authServiceRef.user.address1 == null ||
      this.authServiceRef.user.city == null ||
      this.authServiceRef.user.zip_code == null ||
      this.authServiceRef.user.country == null
    ) {
      return true;
    } else {
      return false;
    }
  }
  profileNeedsFirstLastName() {
    if (
      this.authServiceRef.user.first_name == null || this.authServiceRef.user.first_name === '' ||
      this.authServiceRef.user.last_name == null || this.authServiceRef.user.last_name === ''
    ) {
      return true;
    } else {
      return false;
    }
  }
  onOdSubmit() {
    if (this.uu !== undefined) {
      this.uu.onSubmit(this.uu.form);
    } else {
      this.goToPayment();
    }
  }

  ngOnInit() {
  }


}
