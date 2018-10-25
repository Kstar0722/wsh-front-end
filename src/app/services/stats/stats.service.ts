import { Injectable } from '@angular/core';
import { API_LIST } from '../../services/web-api/api-list';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StatsService {
  data;
  labels: string[] = [];
  isLoading = false;
  constructor(httpClient: HttpClient) {
    this.isLoading = true;
    httpClient.get(API_LIST.statistics).subscribe((data) => {
      this.data = data;
      this.labels = Object.keys(data);
      this.isLoading = false;
    });
  }

}
