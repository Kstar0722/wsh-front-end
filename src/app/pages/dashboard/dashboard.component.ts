import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../services/auth/auth.service';
import { DateParserService } from '../../services/date-parser/date-parser.service';
import { ExtraRenewalService } from '../../services/extra-renewal/extra-renewal.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { SubscriptionsSummary, PlanLotteryData } from '../../services/plans/plans.service';
import { API_LIST } from '../../services/web-api/api-list';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  baseLotteries = ['megamillions', 'euromillions'];
  origin = window.location.origin;
  renewal_notify = false;
  activeSyndicate:number = null;
  subscriptionsSummary:SubscriptionsSummary = null;
  ticketsData = [];
  isLoading = false;
  isShowMessage = false;

  constructor(
    public authService: AuthService,
    private _extrarenewal: ExtraRenewalService,
    private httpClient: HttpClient
  ) {
    this.getMyFutureTickets();
  }

  ngOnInit() {
    this.authService.requestCurrentSessionDataObs.subscribe((user: User) => {

      let sixWeeksAgo = new Date();
      sixWeeksAgo.setDate(sixWeeksAgo.getDate() - 7 * 6);
      
      if (!user.first_subscription_datetime || new Date(DateParserService.parse(user.first_subscription_datetime)) > sixWeeksAgo) {
        this.isShowMessage = true;
      }

      if (user.packages.length > 0) {
        this.getSubscriptionsSummary();
      }

      if (user.packages.length === 0 && user.first_subscription_datetime) {
        this.getRenewalState();
      }
    });
  }

  getRenewalState() {
    let renewalState;
    this._extrarenewal.getRenewalState().subscribe(
      (res) => {
          renewalState = res;
          if (renewalState.length !== 0) {
            this.renewal_notify = true;
          }
      },
      (e: HttpErrorResponse) => {
      }
    );
  }

  getSubscriptionsSummary() {
    this.httpClient.get(API_LIST.getSubscriptionsSummary()).subscribe((data: SubscriptionsSummary) => {
      this.subscriptionsSummary = data;
      this.activeSyndicate = data.subscribed_syndicate_memberships[0].membership.syndicate.id;
    });
  }

  isRegularLottery(lotteryData:PlanLotteryData) {
    return this.baseLotteries.indexOf(lotteryData.lottery_key) >= 0;
  }

  getMyFutureTickets() {
    this.isLoading = true;
    this.httpClient.get(API_LIST.ticketList('', false, true)).subscribe((data: any[]) => {
      this.ticketsData = data;
      this.isLoading = false;
    });
  }

  hasActiveSyndicateTickets() {
    for (let ticket of this.ticketsData) {
      if (ticket.syndicate.id == this.activeSyndicate) {
        return true;
      }
    }

    return false;
  }

  chooseSyndicate(syndicateId) {
    this.activeSyndicate = syndicateId;
  }

  getSubscriptionPackageData() {
    let user = this.authService.user;

    if (!user || !user.packages || !user.packages.length) {
      return null;
    }

    let packageId = user.packages[0].package.group;

    if (packageId == 1) {
      return {
        'name': 'Bronze',
        'key': 'bronze'
      }
    }

    if (packageId == 2) {
      return {
        'name': 'Silver',
        'key': 'silver'
      }
    }

    if (packageId == 3) {
      return {
        'name': 'Gold',
        'key': 'gold'
      }
    }

    return null;
  }

  correctSyndicateName(syndicateNumber:any) {
    syndicateNumber = '' + syndicateNumber;

    let pad = '0000';

    if (syndicateNumber.length > pad.length) {
      return syndicateNumber;
    }

    return pad.substring(0, pad.length - syndicateNumber.length) + syndicateNumber;
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
}
