import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_LIST } from '../../services/web-api/api-list';

@Component({
  selector: 'app-my-bonuses',
  templateUrl: './my-bonuses.component.html',
  styleUrls: ['./my-bonuses.component.css']
})
export class MyBonusesComponent implements OnInit {

  constructor(private httpClient: HttpClient) {
    this.getBonusesList();
  }

  bonusData = null;
  isLoading = false;
  getBonusesList() {
    this.isLoading = true;
    this.httpClient.get(API_LIST.getBonusesList).subscribe((data) => {
      this.bonusData = data;
      this.isLoading = false;
    });
  }

  ngOnInit() {
  }

}
