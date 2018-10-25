import { Component, OnInit } from '@angular/core';
import { LotteryPrizesService } from '../../services/lottery-prizes/lottery-prizes.service';

@Component({
  selector: 'app-lottery-prizes',
  templateUrl: './lottery-prizes.component.html',
  styleUrls: ['./lottery-prizes.component.css']
})
export class LotteryPrizesComponent implements OnInit {

  tabData;

  carouselOptsTabs = {
    slidesToShow: 3,
    focusOnSelect: false,
    arrows: true,
    speed: 100,
    swipe: false,
    infinite: false,
    nextArrow: '<i class="fa fa-chevron-right arrow-right slick-arrow"></i>',
    prevArrow: '<i class="fa fa-chevron-left arrow-left slick-arrow"></i>',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  selectedTabIndex = 0;
  boundaries = {
    left: true,
    right: false
  }

  getElemIndex(elem){
    return Array.prototype.slice.call(elem.parentElement.children).indexOf(elem);
  }

  checkBoundaries(){
    if (this.tabData.length - 1 == this.selectedTabIndex){
      this.boundaries.right = true;
    }else{
      this.boundaries.right = false;
    }
    if (0 == this.selectedTabIndex){
      this.boundaries.left = true;
    }else{
      this.boundaries.left = false;
    }
  }
  nextTab(){
    if (!this.boundaries.right) {
      this.selectedTabIndex++;
      this.checkBoundaries();
    }
  }

  prevTab(){
    if (!this.boundaries.left) {
      this.selectedTabIndex--;
      this.checkBoundaries();
    }
  }
  slickChanges(event){
    this.selectedTabIndex = event.currentSlide;
    this.checkBoundaries();
  }
  tabClick(element){
    this.selectedTabIndex = this.getElemIndex(element);
    this.checkBoundaries();
  }

  constructor(lotteryPrizesService: LotteryPrizesService) { 
    this.tabData = lotteryPrizesService.getTabData();
  }

  ngOnInit() {
  }

}
