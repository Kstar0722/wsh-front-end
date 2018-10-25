import { Component, OnInit } from '@angular/core';
import { PlansService } from '../../services/plans/plans.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent {
  plansServiceRef: PlansService;
  constructor(plansService: PlansService, authService: AuthService, router: Router, route: ActivatedRoute) {
    if (authService.isSubscribed()) {
      router.navigate(['/subscription-plan'], { queryParams: route.snapshot.queryParams});
    } else {
      this.plansServiceRef = plansService;
    }
  }
}
