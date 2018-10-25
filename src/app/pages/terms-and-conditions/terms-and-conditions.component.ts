import { Component, OnInit } from '@angular/core';
import { StaticContentService } from '../../services/static-content/static-content.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {

  constructor(
    public staticData: StaticContentService
  ) {
    staticData.checkAndSet(staticData.staticContentData.termsAndConditions);
  }

  ngOnInit() {
  }

}
