import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.css'],
  animations: [
    trigger('toggleItem', [
      state('in', style({height: '*'})),
      state('out', style({height: '0'})),
      transition('in <=> out', animate('250ms ease-in-out'))
    ])
  ]
})
export class AccordionItemComponent implements OnInit {

  @Input('trigger') trigger;
  @Input('body') body;
  @Input('itemsMeta') itemsMeta;
  @Input('index') index;

  constructor() { }


  toggle(){
    // if (!this.itemsMeta.items[this.index]){
    //   this.itemsMeta.items.forEach((element, i) => {
    //     this.itemsMeta.items[i] = false;
    //   });
    // }
    
    this.itemsMeta.items[this.index] = !this.itemsMeta.items[this.index];
  }
  ngOnInit() {
  }

}
