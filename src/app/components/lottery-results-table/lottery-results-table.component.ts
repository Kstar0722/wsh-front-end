import { Component, OnInit } from '@angular/core';
import { LotteryResultsService, LotteryResultsGroupResponse, LotteryResultsGroupNormalized, FormattedDateForTable } from '../../services/lottery-results/lottery-results.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-lottery-results-table',
  templateUrl: './lottery-results-table.component.html',
  styleUrls: ['./lottery-results-table.component.css']
})
export class LotteryResultsTableComponent implements OnInit {
  public drawData: LotteryResultsGroupNormalized[] = [];
  public isLoading = false;
  public rowsPerPage = 4;
  constructor(private lotteryResultsService: LotteryResultsService, public authService: AuthService) {
    this.requestNextDraws();
    
  }

  requestNextDraws(){
    this.isLoading= true;
    this.lotteryResultsService.requestRawGroups(this.drawData.length,this.rowsPerPage).subscribe((data: LotteryResultsGroupResponse[])=>{
      let months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
      data.forEach(element => {
        let newElem: LotteryResultsGroupNormalized = {
          datesObj: new FormattedDateForTable(), 
          group: element
        };
        let startDate = new Date(element.start_datetime);
        let endDate = new Date(element.end_datetime);

        newElem.datesObj.days.push( startDate.getDate().toFixed(0) );
        if (newElem.datesObj.days[0] != endDate.getDate().toFixed(0)){
          newElem.datesObj.days.push( endDate.getDate().toFixed(0) );
        }
        newElem.datesObj.months.push( months[startDate.getMonth()] );
        if (newElem.datesObj.months[0] != months[endDate.getMonth()]){
          newElem.datesObj.months.push( months[endDate.getMonth()] );
        }
        newElem.datesObj.years.push( startDate.getFullYear().toFixed(0) );
        if (newElem.datesObj.years[0] != endDate.getFullYear().toFixed(0)){
          newElem.datesObj.years.push( endDate.getFullYear().toFixed(0) );
        }
        this.drawData.push(newElem);
      });
      this.isLoading = false;
    });
  }

  ngOnInit() {
  }

}
