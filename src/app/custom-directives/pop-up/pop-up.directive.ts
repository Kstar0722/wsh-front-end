import { Directive, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appPopUp]'
})
export class PopUpDirective {
  element;
  @Input('appPopUp') appPopupOptions: Options = new Options();
  @HostListener('click', ["$event"]) onClick(e) {
    if (this.appPopupOptions.openContentOnClick){
      e.preventDefault();
      this.inflateElem(this.elementRef.nativeElement.querySelector('.app-pop-up'));
    }
  }
  constructor(private elementRef: ElementRef, private router: Router) {

  }

  inflateElem(elem){
    elem.classList.add("show");
    setTimeout(()=>{
      elem.classList.add("inflate");
    }, 300);
  }
  deflateElem(elem){
    elem.classList.remove("inflate");
    setTimeout(()=>{
      elem.classList.remove("show");
    }, 700);
    
    
  }
  
  ngAfterViewInit(){
    let bgClose = document.createElement("span"); 
    bgClose.classList.add('box-bg-close');
    bgClose.addEventListener('click', (e)=>{
      e.stopPropagation();
      this.deflateElem(this.elementRef.nativeElement.querySelector('.app-pop-up'));
    });
    this.elementRef.nativeElement.querySelector('.app-pop-up').appendChild(bgClose);
    this.elementRef.nativeElement.querySelectorAll('.close-box').forEach((btn)=>{
      btn.addEventListener('click', (e)=>{
        e.stopPropagation();
        this.deflateElem(this.elementRef.nativeElement.querySelector('.app-pop-up'));
      });
    });
    
    if (this.appPopupOptions.openSelfAutomatically){
      this.inflateElem(this.elementRef.nativeElement.querySelector('.app-pop-up'));
    }
    
  }
}
class Options{
  openContentOnClick?: boolean = false;
  // -----------------------------
  openSelfAutomatically?: boolean = false;
}
