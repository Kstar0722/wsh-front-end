import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { API_LIST } from '../../services/web-api/api-list';

@Component({
  selector: 'app-my-syndicates',
  templateUrl: './my-syndicates.component.html',
  styleUrls: ['./my-syndicates.component.css']
})
export class MySyndicatesComponent implements OnInit {

  isLoading = false;
  memberships: any = [];
  constructor(public authService: AuthService, private httpClient: HttpClient) {
    this.getMembership();
  }

  getMembership() {
    this.isLoading = true;
    this.httpClient.get(API_LIST.memberships).subscribe((data) => {
      this.memberships = data;
      this.isLoading = false;
    });
  }
  ngOnInit() {
  }

}
