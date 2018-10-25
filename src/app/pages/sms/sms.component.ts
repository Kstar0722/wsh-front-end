import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { SubscriptionsService } from '../../services/subscriptions/subscriptions.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {

  formSubmitted = false;
  submitErrors = [];
  isLoading = false;
  phone_form = new FormGroup({
    phone_prefix: new FormControl('', Validators.compose([
      Validators.required
    ])),
    phone_number: new FormControl('', Validators.compose([
      Validators.required,
    ])),
  });
  constructor(
    private router: Router,
    private subscriptionsService: SubscriptionsService
  ) { }

  ngOnInit() {
  }
  subscribe() {
    this.router.navigate(['/pricing']);
  }
  unsubscribe() {
    this.submitErrors = [];
    this.isLoading = true;
    const phoneNumber = this.phone_form;
    this.subscriptionsService.smsCancelSubscription(phoneNumber.value).subscribe(
      (data) => {
        this.submitErrors = [];
        this.formSubmitted = true;
      },
      (e: HttpErrorResponse) => {
        this.submitErrors = [];
        this.isLoading = false;
        switch (e.status){
          case 400:
            this.submitErrors.push(e.error.string);
            break;
          case 422:
            e.error.errors.forEach(error => {
              this.submitErrors.push(error.message);
            });
            break;
        }
      }
    );
  }
}
