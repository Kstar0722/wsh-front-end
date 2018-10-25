import { Component, OnInit } from '@angular/core';
import { PlansService, Plans, Plan } from '../../services/plans/plans.service';
import { CurrencyService } from '../../services/currency/currency.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pricing-plans-simple',
  templateUrl: './pricing-plans-simple.component.html',
  styleUrls: ['./pricing-plans-simple.component.css']
})
export class PricingPlansSimpleComponent implements OnInit {
  currencyServiceRef: CurrencyService;
  plansServiceRef: PlansService;
  plans: Plans;
  Object = Object;
  constructor(plansService: PlansService, currencyService: CurrencyService, private route: ActivatedRoute) {
    this.plans = plansService.plans;
    this.currencyServiceRef = currencyService;
    this.plansServiceRef = plansService;
    this.plansServiceRef.initPlans(route.snapshot.queryParams.selected_offer);
  }
  ngOnInit() {
  }
  ngAfterViewInit(){
    this.currencyServiceRef.subscribeToCurrencyChanges((data)=>{
      this.plansServiceRef.initPlans(this.route.snapshot.queryParams.selected_offer);
    });
  }
  private array0to(limit: number){
    return Array(limit).fill(0).map((x,i)=>i);
  } 

}


