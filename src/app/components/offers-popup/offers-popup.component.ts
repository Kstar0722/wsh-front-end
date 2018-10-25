import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { PageTplDataService } from '../../services/page-tpl-data/page-tpl-data.service';

@Component({
  selector: 'app-offers-popup',
  templateUrl: './offers-popup.component.html',
  styleUrls: ['./offers-popup.component.css']
})
export class OffersPopupComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('selectedOffer') selectedOffer: string = null;
  constructor(route: ActivatedRoute, public authService: AuthService, private pageTplDataService: PageTplDataService) {
    this.selectedOffer = route.snapshot.queryParams.selected_offer;
  }

  hideOffersPopupOnThesePagesClasses = [
    'page-pricing',
    'page-subscription-plan',
    'page-subscription',
    'page-register'
  ];


  showOffers() {
    if (this.hideOffersPopupOnThesePagesClasses.indexOf(this.pageTplDataService.pageTplData.pageClass) === -1) {
      return true;
    } else {
      return false;
    }
  }
  ngOnInit() {

  }

}
