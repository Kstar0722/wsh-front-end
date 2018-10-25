import { Component, OnInit } from '@angular/core';
import { PlansService } from '../../services/plans/plans.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  plansServiceRef: PlansService;
  constructor(plansService: PlansService, route: ActivatedRoute) {
    this.plansServiceRef = plansService;
  }
  ngOnInit() {
  }

}


