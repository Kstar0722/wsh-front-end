import { Component, OnInit } from '@angular/core';
import { JackpotsService } from '../../services/jackpots/jackpots.service';
import { CurrencyService } from '../../services/currency/currency.service';

@Component({
  selector: 'app-syndicate-comparison',
  templateUrl: './syndicate-comparison.component.html',
  styleUrls: ['./syndicate-comparison.component.css']
})
export class SyndicateComparisonComponent implements OnInit {
  currencyServiceRef: CurrencyService;
  jackpotServiceRef: JackpotsService;
  lotteryDataRows = [
    // EuroMillions
    {
      // column 1
      lottery: {
        headerName: 'Lottery & Jackpot',
        lotteryName: 'EuroMillions',
        jackpotKey: 'euromillions'
      },
      // column 2
      withOneTicket:{
        headerName: 'Buying one ticket',
        odds: '1 in 140,000,000'
      },
      // column 3
      withSyndicate:{
        headerName: 'Buying 1 year syndicate membership',
        plans:[
          {
            planName: 'Bronze',
            odds: '140,000 - 1'
          },
          {
            planName: 'Silver',
            odds: '50,000 - 1'
          },
          {
            planName: 'Gold',
            odds: '25,000 - 1'
          }
        ]
      }
    },

    // PowerBall
    {
      // column 1
      lottery: {
        headerName: 'Lottery & Jackpot',
        lotteryName: 'PowerBall',
        jackpotKey: 'powerball'
      },
      // column 2
      withOneTicket:{
        headerName: 'Buying one ticket',
        odds: '1 in 260,000,000'
      },
      // column 3
      withSyndicate:{
        headerName: 'Buying 1 year syndicate membership',
        plans:[
          {
            planName: 'Bronze',
            odds: '260,000 - 1'
          },
          {
            planName: 'Silver',
            odds: '90,000 - 1'
          },
          {
            planName: 'Gold',
            odds: '40,000 - 1'
          }
        ]
      }
    },
    // Mega Millions
    {
      // column 1
      lottery: {
        headerName: 'Lottery & Jackpot',
        lotteryName: 'Mega Millions',
        jackpotKey: 'megamillions'
      },
      // column 2
      withOneTicket:{
        headerName: 'Buying one ticket',
        odds: '1 in 290,000,000'
      },
      // column 3
      withSyndicate:{
        headerName: 'Buying 1 year syndicate membership',
        plans:[
          {
            planName: 'Bronze',
            refferals: 1,
            odds: '5,800,000 - 1'
          },
          {
            planName: 'Silver',
            refferals: 10,
            odds: '580,000 - 1'
          },
          {
            planName: 'Gold',
            refferals: 50,
            odds: '116,000 - 1'
          }
        ]
      }
    }
  ];

  condensedStructure = null;
  constructor(jackpotService: JackpotsService, currencyService: CurrencyService) { 
    this.currencyServiceRef = currencyService;
    this.jackpotServiceRef = jackpotService;
    this.showSelected(0, this.lotteryDataRows);
  }

  public showSelected(index, rows){
    this.condensedStructure = rows[index];
  }
  public getMainHeaders(object): string[]{
    let headers = [];
      Object.keys(object).forEach((item, i)=>{
        headers.push(object[item].headerName);
      });
    return headers;

  }
  ngOnInit() {
  }

}
