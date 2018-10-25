import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-my-subscription-plan',
  templateUrl: './my-subscription-plan.component.html',
  styleUrls: ['./my-subscription-plan.component.css']
})
export class MySubscriptionPlanComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
