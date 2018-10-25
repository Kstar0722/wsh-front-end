import { Component, OnInit } from '@angular/core';
import { PlansService } from '../../services/plans/plans.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, User } from '../../services/auth/auth.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  plansServiceRef: PlansService;
  constructor(plansService: PlansService,
              route: ActivatedRoute,
              appComponent: AppComponent,
              authService: AuthService,
              router: Router
  ){
    if (!appComponent.firstTimeLaunched && authService.isLoggedIn()) {
      router.navigate(['/dashboard']);
    }

    this.plansServiceRef = plansService;
  }
}
