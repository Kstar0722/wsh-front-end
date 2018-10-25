import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { API_LIST } from '../../services/web-api/api-list';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {

  constructor(public authService: AuthService, private httpClient: HttpClient) {
    this.getMyFutureTickets();
  }

  ticketsData = [];
  isLoading = false;
  getMyFutureTickets() {
    this.isLoading = true;
    this.httpClient.get(API_LIST.ticketList('', false, true)).subscribe((data: any[]) => {
      this.ticketsData = data;
      this.isLoading = false;
    });
  }

  ngOnInit() {
  }

}
