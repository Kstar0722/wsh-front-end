import { Component, OnInit } from '@angular/core';
import { MyReferralsService, ReferralRow } from '../../services/my-referrals/my-referrals.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-my-referrals',
  templateUrl: './my-referrals.component.html',
  styleUrls: ['./my-referrals.component.css']
})
export class MyReferralsComponent implements OnInit {
  Math = Math;

  origin = window.location.origin;
  currentPage = 1;

  myReferralsServiceRef: MyReferralsService;
  constructor(myReferalsService: MyReferralsService, public authService: AuthService) {
    this.myReferralsServiceRef = myReferalsService;
  }
  copyLinkToClipboard(elem) {
    try {
      elem.select();
      document.execCommand('Copy');
    } catch (err) {
      alert('Your browser does not support this feature. Try copying it using other methods.');
      throw new Error('Your browser does not support automatic \'Copy\' command.');
    }
  }

  array0to(limit: number) {
    return Array(limit).fill(0).map((x, i) => i);
  }

  ngOnInit() {
  }

}
