import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { SubscriptionsService } from '../../services/subscriptions/subscriptions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SmsComponent } from '../sms/sms.component';

@Component({
  selector: 'app-sms-re',
  templateUrl: '../sms/sms.component.html',
  styleUrls: ['../sms/sms.component.scss']
})
export class SmsReComponent extends SmsComponent implements OnInit {
}
