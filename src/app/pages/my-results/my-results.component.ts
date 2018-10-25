import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { LotteryResultsService, LotteryResultsResponse } from '../../services/lottery-results/lottery-results.service';
import { HttpClient } from '@angular/common/http';
import { API_LIST } from '../../services/web-api/api-list';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-my-results',
  templateUrl: './my-results.component.html',
  styleUrls: ['./my-results.component.css']
})
export class MyResultsComponent implements OnInit {
  customPageTitle: string = null;
  public drawData: LotteryResultsResponse[] = [];

  Math = Math;
  detailsLoading = false;
  chosenDrawData = null;
  drawTicketsData = null;
  detailsData = null;
  drawsPerPage = 10;
  isLoadingDraws = false;
  loadMoreActive = true;

  constructor(public authService: AuthService, private lotteryResultsService: LotteryResultsService, private httpClient: HttpClient) {
    this.requestDraws(true, false, 0, this.drawsPerPage, true);
  }

  detailsActive = false;
  showDetails(id: number) {
    this.detailsActive = true;
    this.getTicketFromDrawResult(id);
  }
  hideDetails() {
    this.customPageTitle = null;
    this.detailsActive = false;
  }
  getTicketFromDrawResult(id) {
    this.detailsLoading = true;
    this.httpClient.get(API_LIST.ticketList(id, true, false)).subscribe((data) => {
      this.drawTicketsData = data;
      this.detailsData = data[0];
      this.chosenDrawData = data[0] ? data[0].draw : null;
      this.detailsLoading = false;
      this.customPageTitle = '<span class="draw-details-page-title">' +
                              this.chosenDrawData.lottery_name + ' <br>' +
                              formatDate(this.chosenDrawData.local_datetime, 'mediumDate', 'en') + '</span>';
    });
  }
  getBestResultsFromTickets(tickets: any[]) {
    let highestMatchLine = null;

    if (tickets && tickets.length) {
      tickets.forEach((ticket, i) => {
        const currentHighLine = this.getBestResultsFromLines(ticket.lines);
        if (currentHighLine != null && (!highestMatchLine || highestMatchLine.prize < currentHighLine.prize)) {
          highestMatchLine = currentHighLine;
        }
      });
    }

    return highestMatchLine;
  }
  getBestResultsFromLines(lines: any[]) {
    let highestMatchLine = null;

    if (lines && lines.length) {
      lines.forEach((line, i) => {
        if (line.prize != null && (!highestMatchLine || highestMatchLine.prize < line.prize)) {
          highestMatchLine = line;
        }
      });
    }

    return highestMatchLine;
  }
  getTotalTicketsPrizes(tickets: any[]) {
    let total = 0;
    if (tickets != null) {
      tickets.forEach(ticket => {
        if (ticket.lines) {
          total += this.getTotalTicketPrizes(ticket.lines);
        }
      });
    }

    return total;
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

  requestDraws(include_historical: boolean, include_upcoming: boolean, offset: number, limit: number, for_current_user: boolean) {
    const lengthBefore = this.drawData.length;
    this.isLoadingDraws = true;
    this.lotteryResultsService.requestRawResults(
      include_historical, include_upcoming, offset, limit, for_current_user
    ).subscribe((data: any) => {
      data.forEach(element => {
        this.drawData.push(element);
      });
      this.isLoadingDraws = false;
      if (lengthBefore + this.drawsPerPage > this.drawData.length) {
        this.loadMoreActive = false;
      }
    });
  }

  loadMoreDraws() {
    this.requestDraws(true, false, this.drawData.length, this.drawsPerPage, true);
  }

  ngOnInit() {
  }

}
