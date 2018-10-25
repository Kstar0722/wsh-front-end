import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { PlansService  } from '../../services/plans/plans.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from '../../services/currency/currency.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  plansServiceRef: PlansService;
  currencyServiceRef: CurrencyService;
  
  @Input('selectedPlanName') selectedPlanName: string;
  @Input('showVoucherField') showVoucherField: boolean;
  @Input('showOptInEmailsField') showOptInEmailsField: boolean = false;
  @Input('disabledIf') disabledIf: boolean = false;

  @Output() done = new EventEmitter();
  @Output() voucherValidation = new EventEmitter();

  @ViewChild('f') aggreementsForm: NgForm;
  
  optInEmails: boolean = false;
  verifyAge: boolean;
  acceptTerms: boolean;
  acceptRecurrence: boolean;
  submitted: boolean = false;
  voucherData = {
    voucherValid: false,
    voucherValue: '',
    voucherInfo: null,
    voucherPlanId: null
  }
  
  formErrors = [];

  constructor(plansService: PlansService, private route: ActivatedRoute, currencyService: CurrencyService) { 
    this.plansServiceRef = plansService;
    this.currencyServiceRef = currencyService;
    this.plansServiceRef.initPlans(route.snapshot.queryParams.selected_offer);
  }

  scrollToFirstError(){
    $('html, body').animate({scrollTop: $('form .ng-invalid').eq(0).offset().top - 50});
  }
  scrollToErrorMessages(){
    $('html, body').animate({scrollTop: $('form .errors-group').eq(0).offset().top - 50});
  }

  triedSubmit = false;
  onSubmit(form){
    this.triedSubmit = true;
    this.formErrors = [];
    if (!form.valid){
      
      this.formErrors.push('Please check all the required boxes.');
      this.scrollToFirstError();
    } else if ( !this.voucherData.voucherValid && this.voucherData.voucherValue != "" ){
      this.formErrors.push('The voucher code is invalid.');
    }else{
      this.done.emit({fields:{optInEmails: this.optInEmails}});
    }
    
    
  }
  voucherValidationDone(data){
    this.voucherData.voucherValid = data.isValid;
    this.voucherData.voucherValue = data.voucherCode;
    this.voucherData.voucherInfo = data.voucherInfo;
    this.voucherData.voucherPlanId = data.voucherPlanId;
    this.formErrors = [];
    this.voucherValidation.emit(this.voucherData);
  }
  ngOnInit() {}
  ngAfterViewInit(){
    setTimeout(()=>{
      this.currencyServiceRef.subscribeToCurrencyChanges((data)=>{
        this.plansServiceRef.initPlans(this.route.snapshot.queryParams.selected_offer);
      });
    })
    
  }
  
}
