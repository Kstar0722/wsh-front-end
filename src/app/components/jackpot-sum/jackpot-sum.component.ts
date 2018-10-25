import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency/currency.service';
import { JackpotsService, JackpotsSumNormalizedModel } from '../../services/jackpots/jackpots.service';

@Component({
  selector: 'app-jackpot-sum',
  templateUrl: './jackpot-sum.component.html',
  styleUrls: ['./jackpot-sum.component.css']
})
export class JackpotSumComponent implements OnInit {
  currencyServiceRef: CurrencyService;
  jackpotsServiceRef: JackpotsService;

  constructor(jackpotService: JackpotsService, currencyService: CurrencyService){ 
    
    this.currencyServiceRef = currencyService;
    this.jackpotsServiceRef = jackpotService;

  }
  ngOnInit() {
  }

}
