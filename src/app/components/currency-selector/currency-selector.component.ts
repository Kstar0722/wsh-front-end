import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrencyService } from '../../services/currency/currency.service';
import { PlansService } from '../../services/plans/plans.service';
import { JackpotsService } from '../../services/jackpots/jackpots.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.css']
})
export class CurrencySelectorComponent {

  @ViewChild('currencySelectElem') currencySelectElem;

  selectedCurrency: string;
  currencies: string[];

  currencyServiceRef: CurrencyService;
  plansServiceRef: PlansService;
  jackpotsServiceRef: JackpotsService;

  constructor(currencyService: CurrencyService, plansService: PlansService, jackpotsService: JackpotsService, private route: ActivatedRoute) {

    this.currencyServiceRef = currencyService;
    this.plansServiceRef = plansService;
    this.jackpotsServiceRef = jackpotsService;

    this.currencies = this.currencyServiceRef.getAvailableCurrenciesNames();
    this.selectedCurrency = this.currencyServiceRef.getSelectedCurrency();

    // console.log(this.element );
    
  }

  ngOnInit(){

    this.currencyServiceRef.addCurrencyObservable(this.currencySelectElem.nativeElement);
    this.currencySelectElem.nativeElement.addEventListener('change', (e)=>{
      this.currencyServiceRef.setSelectedCurrency(this.currencySelectElem.nativeElement.value);
      this.jackpotsServiceRef.getJackpotsSum(this.currencyServiceRef.getSelectedCurrency());
      this.jackpotsServiceRef.getJackpotsList(this.currencyServiceRef.getSelectedCurrency());
    });
    // console.log(this.currencyServiceRef.currencyObservables);
  }
  ngOnDestroy(){
    this.currencyServiceRef.currencyObservables = [];
  }


}
