import { Component, OnInit } from '@angular/core';
import { StaticContentService } from '../../services/static-content/static-content.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(public staticData: StaticContentService) {
    staticData.checkAndSet(staticData.staticContentData.privacyPolicy);
  }

  ngOnInit() {
  }

}
