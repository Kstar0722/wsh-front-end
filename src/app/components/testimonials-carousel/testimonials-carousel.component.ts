import { Component, OnInit, Input } from '@angular/core';
import { TestimonialsService, Testimonial } from '../../services/testimonials/testimonials.service';

@Component({
  selector: 'app-testimonials-carousel',
  templateUrl: './testimonials-carousel.component.html',
  styleUrls: ['./testimonials-carousel.component.css']
})
export class TestimonialsCarouselComponent implements OnInit {

  @Input('limit') limit;

  testimonialsData: Testimonial[];

  carouselOpts = {
    slidesToShow: 1, 
    slidesToScroll: 1,
    nextArrow: '<i class="fa fa-chevron-right arrow-right"></i>',
    prevArrow: '<i class="fa fa-chevron-left arrow-left"></i>',
    autoplay: true,
    autoplaySpeed: 4000
  };

  constructor(testimonialsService: TestimonialsService) { 
    this.testimonialsData = testimonialsService.data;
  }

  ngOnInit() {
  }

}
