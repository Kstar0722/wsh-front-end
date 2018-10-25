import { Component, OnInit, Input } from '@angular/core';
import { PlansService, Plans, Plan } from '../../services/plans/plans.service';
import { CurrencyService } from '../../services/currency/currency.service';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionsService } from '../../services/subscriptions/subscriptions.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pricing-plans',
  templateUrl: './pricing-plans.component.html',
  styleUrls: ['./pricing-plans.component.css']
})
export class PricingPlansComponent implements OnInit {
  @Input('redirectOnPlanChange') redirectOnPlanChange = false;
  @Input('showDisclaimer') showDisclaimer: boolean = true;
  @Input('highlightDisclaimer') highlightDisclaimer: boolean = true;
  currencyServiceRef: CurrencyService;
  plansServiceRef: PlansService;
  plans: Plans;
  Object = Object;
  constructor(
    plansService: PlansService,
    currencyService: CurrencyService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public subscriptionsService: SubscriptionsService
  ) {
    this.currencyServiceRef = currencyService;
    this.plansServiceRef = plansService;

    this.plans = this.plansServiceRef.plans;
    if (this.authService.isLoggedIn()){
      this.authService.requestCurrentSessionDataObs.subscribe((user)=>{
        this.callForPlans();
      });
    }else{
      this.callForPlans();
    }
    
  }
  callForPlans(){
    if (this.authService.isLoggedIn()){
      if (this.authService.isSubscribed()){
        this.plansServiceRef.initPlans();
      }else{
        this.plansServiceRef.initPlans(this.route.snapshot.queryParams.selected_offer);
      }
    }else{
      this.plansServiceRef.initPlans(this.route.snapshot.queryParams.selected_offer);
    }
  }
  planSelect(planName: string){
    if (this.authService.isLoggedIn()){
      this.router.navigate(['/subscription/'+planName], {queryParams: {selected_offer: this.route.snapshot.queryParams.selected_offer}});
    }else{
      this.router.navigate(['/register/'+planName], {queryParams: {selected_offer: this.route.snapshot.queryParams.selected_offer}});
    }
  }

  planIsChanging = false;
  planChangeErrors = [];
  planChange(planName: string){
    if(!this.redirectOnPlanChange){
      this.planIsChanging = true;
      this.subscriptionsService.changeSubscriptionPlanTo(this.plansServiceRef.packagePriceIds[planName]).subscribe(
        (data)=>{
          this.planChangeErrors = [];
          this.planIsChanging = false;
        },
        (e: HttpErrorResponse)=>{
          this.planIsChanging = false;
          switch (e.status){
            case 404: 
              this.planChangeErrors.push(e.error.string);
              break;
          }
        }
      );
    }else{
      this.router.navigate(['/subscription-plan']);
    }
    
  }
  isNextRenewalPlan(planName: string): boolean{
    if(!!this.authService.user && !!this.authService.user.packages){
      if(!!this.authService.user.packages.length && this.authService.user.packages[0].auto_renewal ){
        if(this.authService.user.packages[0].extend_to_group_id == 0){
          if( this.authService.user.packages[0].package.id == this.plansServiceRef.packagePriceIds[planName] ){
            return true;
          }
        }else{
          if( this.authService.user.packages[0].extend_to_group_id == this.plansServiceRef.packagePriceIds[planName] ){
            return true;
          }
        }
      }
    }
    
    return false;
  }
  isCurrentPlan(planName: string): boolean{
    if(!!this.authService.user && !!this.authService.user.packages && !!this.authService.user.packages[0]){
      if( this.authService.user.packages[0].package.id == this.plansServiceRef.packagePriceIds[planName] ){
        return true;
      }
    }
    
    return false;
  }
  activatingRenewal = false;
  activateRenewal(){
    this.activatingRenewal = true;
    this.subscriptionsService.activateAutoRenewal().subscribe(()=>{
      this.activatingRenewal = false;
    });
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
  private showMoreInfoToggle(plan: Plan){
    plan.planVars.showMoreOnMobile = !plan.planVars.showMoreOnMobile;
  }

  changeConfirmationVisible = false;
  confirmPlanToChange = <string>null;
  showChangeConfirmation(planName: string){
    this.confirmPlanToChange = planName;
    this.changeConfirmationVisible = true;
  }
  hideChangeConfirmation(){
    this.changeConfirmationVisible = false;
    this.confirmPlanToChange = null;
  }
  confirmPlanChange(){
    this.planChange(this.confirmPlanToChange);
    this.hideChangeConfirmation();
  }

}
