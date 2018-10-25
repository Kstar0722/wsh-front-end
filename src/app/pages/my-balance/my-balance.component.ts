import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency/currency.service';
import { AuthService, User } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { API_LIST } from '../../services/web-api/api-list';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-my-balance',
  templateUrl: './my-balance.component.html',
  styleUrls: ['./my-balance.component.css']
})
export class MyBalanceComponent implements OnInit {

  amountToWithdraw = 3.01;
  minimumWithdraw = 3;
  withdrawFormActive = false;
  isRequestingWithdraw = false;
  showUpdateSuccessfullMsg = false;
  withdrawErrors = [];
  historyData = [];
  historyPerPage = 8;
  isLoadingHistory = false;
  loadMoreActive = true;
  detailsActive = false;
  detailsLoading = false;
  detailsData = null;

  constructor(
    public currencyService: CurrencyService,
    public authService: AuthService,
    private httpClient: HttpClient,
    route: ActivatedRoute
  ) {
    this.getHistory(0, this.historyPerPage);
    if (route.snapshot.params.withdraw === 'withdraw') {
      this.withdrawFormActive = true;
    }
  }

  showUpdateSuccessfullMsgCall() {
    this.showUpdateSuccessfullMsg = true;
    setTimeout(() => {
      this.showUpdateSuccessfullMsg = false;
    }, 5000);
  }


  showwithdrawForm() {
    this.withdrawFormActive = true;
    this.authService.requestCurrentSessionDataObs.subscribe((user: User) => {
      this.amountToWithdraw = parseFloat(user.balance.toFixed(2));
    });
  }
  hidewithdrawForm() {
    this.withdrawFormActive = false;
  }

  withdraw() {
    this.withdrawErrors = [];
    this.isRequestingWithdraw = true;
    this.httpClient.post(API_LIST.withdraw, {amount: this.amountToWithdraw}).subscribe(
      (data) => {
        this.showUpdateSuccessfullMsgCall();
        this.authService.requestCurrentSessionData(() => {
          this.isRequestingWithdraw = false;
        });
      },
      (err) => {
        console.log(err);
        this.isRequestingWithdraw = false;
        if (err.status === 400) {
          this.withdrawErrors.push(err.error.string);
        } else if (err.status === 422) {
          err.error.errors.forEach(error => {
            this.withdrawErrors.push(error.message);
          });
        }
      }
    );
  }

  getHistory(offset: number, limit: number) {
    const lengthBefore = this.historyData.length;
    this.isLoadingHistory = true;
    this.httpClient.get(API_LIST.balanceHistory(offset, limit)).subscribe((data: any) => {
      data.forEach(element => {
        this.historyData.push(element);
      });
      this.isLoadingHistory = false;
      if (lengthBefore + this.historyPerPage > this.historyData.length) {
        this.loadMoreActive = false;
      }
    });

  }

  loadMoreHistory() {
    this.getHistory(this.historyData.length, this.historyPerPage);
  }

  showDetails(internal_data, internal_type) {
    if (internal_type === 'lineResult1') {
      this.detailsActive = true;
      this.getTicketFromLineResult(internal_data);
    }
  }
  hideDetails() {
    this.detailsActive = false;
    this.detailsData = null;
  }


  getTicketFromLineResult(id) {
    this.detailsLoading = true;
    this.httpClient.get(API_LIST.ticketFromLineResult(id)).subscribe((data) => {
      this.detailsData = data;
      this.detailsLoading = false;
    });
  }
  getFirstBestResultLineIndex(linesArray) {
    let highestPrize = 0;
    let highestPrizeLineIndex = null;
    linesArray.forEach((line, i) => {
      if (line.prize != null && highestPrize < line.prize) {
        highestPrize = line.prize;
        highestPrizeLineIndex = i;
      }
    });
    return highestPrizeLineIndex;
  }
  getTotalTicketPrizes(lines: any[]) {
    let total = 0;
    if (lines != null) {
      lines.forEach(line => {
        if (line.prize != null) {
          total += parseFloat(line.prize);
        }
      });
    }
    return total;
  }
  ngOnInit() {
  }

}
