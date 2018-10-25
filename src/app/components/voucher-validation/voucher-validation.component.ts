import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { API_LIST } from '../../services/web-api/api-list';
import { HttpClient } from '@angular/common/http';
import { Plan } from '../../services/plans/plans.service';
import { CurrencyService } from '../../services/currency/currency.service';

@Component({
  selector: 'app-voucher-validation',
  templateUrl: './voucher-validation.component.html',
  styleUrls: ['./voucher-validation.component.css']
})
export class VoucherValidationComponent implements OnInit {
  currencyServiceRef: CurrencyService;
  voucherCode: string = "";
  timerId;
  isLoading: boolean = false;
  isValid: boolean = false;
  voucherInfo = null;
  @Input('isDisabled') isDisabled: boolean;
  @Input('forPlan') forPlan: Plan;
  @Output('done') done = new EventEmitter();
  constructor(private httpClient: HttpClient, currencyService: CurrencyService) { 
    this.currencyServiceRef = currencyService;
  }
  keyup(){
    this.isValid = false;
    clearTimeout(this.timerId);
    this.isLoading = true;
    this.timerId = setTimeout(()=>{
      this.validate();
    }, 1500);
  }
  validate(){
    this.voucherInfo = null;
    this.isLoading = true;
    if (this.voucherCode == ""){
      this.isValid = false;
      this.isLoading = false;
      this.done.emit({isValid: this.isValid, voucherCode: this.voucherCode, voucherInfo: this.voucherInfo, voucherPlanId: this.forPlan.planVars.packagePriceId});
    }else{
      this.httpClient.get(API_LIST.validateVoucher(this.forPlan.planVars.packagePriceId, this.voucherCode)).subscribe(
        (data)=>{
          this.voucherInfo = data;
          this.isValid = true;
          this.isLoading = false;
          this.done.emit({isValid: this.isValid, voucherCode: this.voucherCode, voucherInfo: this.voucherInfo, voucherPlanId: this.forPlan.planVars.packagePriceId});
        },
        (err)=>{
          this.isValid = false;
          this.isLoading = false;
          this.done.emit({isValid: this.isValid, voucherCode: this.voucherCode, voucherInfo: this.voucherInfo, voucherPlanId: this.forPlan.planVars.packagePriceId});
        }
      );
    }
  }
  ngOnInit(){
    setTimeout(()=>{
      this.currencyServiceRef.subscribeToCurrencyChanges((data)=>{
        this.voucherCode = '';
        this.validate();
      });
    });
  }
  ngOnDestroy() {
    this.voucherCode = '';
    this.validate();
  }

}
