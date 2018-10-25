import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../services/stats/stats.service';



@Component({
  selector: 'app-community-infographic',
  templateUrl: './community-infographic.component.html',
  styleUrls: ['./community-infographic.component.css']
})
export class CommunityInfographicComponent implements OnInit {
  statsServiceRef: StatsService;
  constructor(statsService: StatsService) { 
    this.statsServiceRef = statsService;
  }

  ngOnInit() {
  }

}
