import { Component, OnInit } from '@angular/core';
import { StaticContentService } from '../../services/static-content/static-content.service';

@Component({
  selector: 'app-subscription-agreement',
  templateUrl: './subscription-agreement.component.html',
  styleUrls: ['./subscription-agreement.component.css']
})
export class SubscriptionAgreementComponent implements OnInit {

  constructor(
    public staticData: StaticContentService
  ) {
    staticData.checkAndSet(staticData.staticContentData.subscriptionAgreement);
  }

  ngOnInit() {
  }

}
