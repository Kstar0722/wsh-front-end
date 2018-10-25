import { Component, OnInit } from '@angular/core';
import { JackpotsNormalizedModel, JackpotsService } from '../../services/jackpots/jackpots.service';
import { CurrencyService } from '../../services/currency/currency.service';

@Component({
  selector: 'app-jackpot-balls',
  templateUrl: './jackpot-balls.component.html',
  styleUrls: ['./jackpot-balls.component.css']
})
export class JackpotBallsComponent  {

  public jackpotsNormalized: JackpotsNormalizedModel;
  currencyServiceRef: CurrencyService;
  jackpotsServiceRef: JackpotsService;
  Object = Object;

  constructor(jackpotService: JackpotsService, currencyService: CurrencyService){ 
    this.currencyServiceRef = currencyService;
    this.jackpotsServiceRef = jackpotService;

  };

}
