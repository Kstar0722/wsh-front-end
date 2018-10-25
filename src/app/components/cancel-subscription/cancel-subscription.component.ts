import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { SubscriptionsService } from '../../services/subscriptions/subscriptions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PlansService } from '../../services/plans/plans.service';

@Component({
  selector: 'app-cancel-subscription',
  templateUrl: './cancel-subscription.component.html',
  styleUrls: ['./cancel-subscription.component.css']
})
export class CancelSubscriptionComponent implements OnInit {
  isLoading = false;

  errors:string[] = [];
  constructor( private subscriptionsService: SubscriptionsService, public plansService: PlansService, public authService: AuthService) { 
    // if (authService.user != null){
    // }else{
    //   authService.requestCurrentSessionData().subscribe((data)=>{
    //     authService.user = data.user;
    //   });
    // }
  }
  cancelSubscription(){
    this.isLoading = true;
    this.subscriptionsService.cancelSubscription().subscribe(
      (data)=>{
        this.errors = [];
        this.isLoading = false;
      },
      (e: HttpErrorResponse)=>{
        this.isLoading = false;
        switch (e.status){
          case 404: 
            this.errors.push(e.error.string);
            break;
        }
      }
    );
  };
  activateAutoRenewal(){
    this.isLoading = true;
    this.subscriptionsService.activateAutoRenewal().subscribe(
      (data)=>{
        this.errors = [];
        this.isLoading = false;
      },
      (e: HttpErrorResponse)=>{
        this.isLoading = false;
        switch (e.status){
          case 404: 
            this.errors.push(e.error.string);
            break;
        }
      }
    );
  };
  
  ngOnInit() {
  }

}
