import { Injectable } from '@angular/core';
import { API_LIST } from '../web-api/api-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class LotteryResultsService {
  constructor(private httpClient: HttpClient) {}

  requestRawGroups(offset: number, limit: number): Observable<LotteryResultsGroupResponse[]> {
    return new Observable((observer) => {
      this.httpClient.get<LotteryResultsGroupResponse[]>(API_LIST.lotteriesResultsGroups(offset, limit)).subscribe((data) => {
        observer.next(data);
      });
    });
  }
  requestRawResults (
    include_historical: boolean,
    include_upcoming: boolean,
    offset: number, limit: number,
    for_current_user: boolean): Observable<LotteryResultsResponse[]> {
    return new Observable((observer) => {
      this.httpClient.get<LotteryResultsResponse[]>(
        API_LIST.allLotteriesResults(include_historical, include_upcoming, offset, limit, for_current_user)).subscribe((data) => {
        observer.next(data);
      });
    });
  }

}
export class ResultBall {
  number: number = null;
  special: boolean = null;
  hit: boolean = null;
}
export class LotteryResultsResponse {
  id: number;
  lottery_type: string;
  lottery_name: string;
  local_datetime: string;
  utc_datetime: string;
  upcoming: boolean;
  special_name: string;
  currency: string;
  jackpot: string;
  result: {balls: ResultBall[], texts: any[]};
  matches: any[];
}
export class LotteryResultsGroupResponse {
  start_datetime: string;
  end_datetime: string;
  euromillions: LotteryResultsResponse;
  megamillions: LotteryResultsResponse;
  powerball: LotteryResultsResponse;
}
export class LotteryResultsGroupNormalized {
  group: LotteryResultsGroupResponse;
  datesObj: FormattedDateForTable;
}
export class FormattedDateForTable {
  days: string[] = [];
  months: string[] = [];
  years: string[] = [];
}
