import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_LIST } from '../../services/web-api/api-list';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  paymentData;
  isLoading = false;
  authServiceRef: AuthService = null;
  replacePageTitle: string = null;
  cardRenewal = false;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, public authService: AuthService) {
    if (route.snapshot.queryParams.cardrenewal !== undefined) {
      this.cardRenewal = true;
    }
    this.authServiceRef = authService;
    this.isLoading = true;
    httpClient.get(API_LIST.singlePaymentStatus(route.snapshot.params.tid)).subscribe((data) => {
      this.paymentData = data;
      this.isLoading = false;
    });
  }

  tryAgain() {
    this.isLoading = true;
    this.httpClient.get(API_LIST.packageFromTID(this.route.snapshot.params.tid)).subscribe((packageData: any) => {
      this.httpClient.post(
        API_LIST.makePayment(packageData.package_price.id, window.location.origin + '/payment-status'), {}
      ).subscribe((data: any) => {
        this.isLoading = false;
        window.location.href = data.gateway_url;
      });
    });
  }

  ngOnInit() {
  }

}
