import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../services/auth/auth.service';
import { PlansService } from '../../services/plans/plans.service';
import { HttpClient } from '@angular/common/http';
import { API_LIST } from '../../services/web-api/api-list';
import { DateParserService } from '../../services/date-parser/date-parser.service';

@Component({
  selector: 'app-update-payment-card',
  templateUrl: './update-payment-card.component.html',
  styleUrls: ['./update-payment-card.component.css']
})
export class UpdatePaymentCardComponent implements OnInit {

  loadingCurrentPakageData = false;
  currentPackageData = null;

  verifyAge = false;
  acceptTerms = false;
  formErrors = [];
  triedSubmit = false;
  requestingPayment = false;

  constructor(public authService: AuthService, private httpClient: HttpClient, public plansService: PlansService) {
    this.loadingCurrentPakageData = true;
    authService.requestCurrentSessionDataObs.subscribe((user: User) => {
      httpClient.get(API_LIST.getCurrentSubscriptionPackage).subscribe((data) => {
        this.loadingCurrentPakageData = false;
        this.currentPackageData = data;
      });
    });
  }

  addDaysToDate(dateString: string, days: number) {
    const date = new Date(DateParserService.parse(dateString));
    return date.setDate(date.getDate() + days);
  }

  onSubmit(f) {
    this.triedSubmit = true;
    this.formErrors = [];
    if (f.valid) {
      this.requestingPayment = true;
      this.httpClient.post(API_LIST.changeCardPayment(window.location.origin + '/payment-status'), {}).subscribe(
        (data: any) => {
          this.requestingPayment = false;
          window.location.href = data.gateway_url;
        },
        (err) => {
          console.log(err);
          this.requestingPayment = false;
          this.formErrors.push(err.error.string);
        }
      );
    }
  }
  ngOnInit() {
  }

}
