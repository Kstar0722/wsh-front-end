import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_LIST } from '../web-api/api-list';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class MyReferralsService {
  isWaitingForResponse = false;
  referralsRows: ReferralRow[];
  referralsRowsFiltered: ReferralRow[];
  referralsCount = 0;
  pagination = {
    currentPage: 1,
    perPage: 20
  };

  constructor(private httpClient: HttpClient) {
    this.getReferrals(0, this.pagination.perPage);
  }
  getReferrals(offset, limit) {
    this.isWaitingForResponse = true;
    this.httpClient.get<ReferralsResponse>(API_LIST.getReferrals + '?offset=' + offset + '&limit=' + limit).subscribe((data) => {
      this.referralsRows = data.items;
      this.referralsRowsFiltered = data.items;
      this.referralsCount = data.total_count;
      this.isWaitingForResponse = false;
    });
  }
  sendReminder(id: number, dataIndex: number) {
    this.isWaitingForResponse = true;
    this.httpClient.post<ReferralRow>(API_LIST.remindReferral(id), {}).subscribe(
      (data) => {
        this.referralsRows[dataIndex] = data;
        this.referralsRowsFiltered[dataIndex] = data;
        this.isWaitingForResponse = false;
      },
      (err: HttpErrorResponse) => {
        this.isWaitingForResponse = false;
        // console.log(err);
        if (err.status === 400) {
          alert(err.error.string);
        } else if (err.status === 404) {
          alert('Referral not found');
        }
      }
    );
  }

  changePageTo(i: number) {
    this.pagination.currentPage = i;
    this.getReferrals((this.pagination.currentPage - 1) * this.pagination.perPage, this.pagination.perPage);
  }
  pageNext() {
    if (this.pagination.currentPage < this.getMaxPages()) {
      this.pagination.currentPage++;
      this.getReferrals((this.pagination.currentPage - 1) * this.pagination.perPage, this.pagination.perPage);
    }
  }
  pageLast() {
    if (this.pagination.currentPage < this.getMaxPages()) {
      this.pagination.currentPage = this.getMaxPages();
      this.getReferrals((this.pagination.currentPage - 1) * this.pagination.perPage, this.pagination.perPage);
    }
  }
  pagePrev() {
    if (this.pagination.currentPage > 1) {
      this.pagination.currentPage--;
      this.getReferrals((this.pagination.currentPage - 1) * this.pagination.perPage, this.pagination.perPage);
    }
  }
  pageFirst() {
    if (this.pagination.currentPage > 1) {
      this.pagination.currentPage = 1;
      this.getReferrals((this.pagination.currentPage - 1) * this.pagination.perPage, this.pagination.perPage);
    }
  }

  getMaxPages() {
    return Math.ceil(this.referralsCount / this.pagination.perPage);
  }



}
export class ReferralsResponse {
  total_count: number;
  items: ReferralRow[];
}
export class ReferralRow {

  bonus_applied_at: string;
  bonus_lines_referree: number;
  bonus_lines_referral: number;
  id: number;
  referral_name: string;
  registered_at: string;
  reminder_sent_at: string;

}

