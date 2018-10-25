import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accordion-group',
  templateUrl: './accordion-group.component.html',
  styleUrls: ['./accordion-group.component.css']
})
export class AccordionGroupComponent implements OnInit {

  @Input('accordionItems') accordionItems: any[];
  @Input('triggerKey') triggerKey: string;
  @Input('bodyKey') bodyKey: string;

  constructor() { 
    
  }

  itemsMeta = {items: []};
  ngOnInit() {
    this.accordionItems.forEach((item, i)=>{
      // if (i == 0){
      //   this.itemsMeta.items.push(true);
      // }else{
      //   this.itemsMeta.items.push(false);
      // }

      this.itemsMeta.items.push(false);
      
    });
  }

}
