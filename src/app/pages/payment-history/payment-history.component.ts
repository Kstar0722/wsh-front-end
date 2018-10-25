import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { API_LIST } from '../../services/web-api/api-list';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  isLoading = false;
  paymentData = <any>null;
  paymentDetailsData = <any>null;
  constructor(httpClient: HttpClient, public authService: AuthService) {
    this.isLoading = true;
    httpClient.get(API_LIST.paymentHistory).subscribe((data) => {
      this.paymentData = data;
      this.isLoading = false;
    });
  }
  detailsActive = false;
  showDetails(row) {
    this.detailsActive = true;
    this.paymentDetailsData = row;
  }
  hideDetails() {
    this.detailsActive = false;
    this.paymentDetailsData = null;
  }

  ngOnInit() {
  }
}
