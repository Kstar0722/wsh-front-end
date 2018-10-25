import { Component, OnInit, Input } from '@angular/core';
import { TestimonialsService, Testimonial } from '../../services/testimonials/testimonials.service';

@Component({
  selector: 'app-testimonials-latest',
  templateUrl: './testimonials-latest.component.html',
  styleUrls: ['./testimonials-latest.component.css']
})
export class TestimonialsLatestComponent implements OnInit {
  @Input('limit') limit;
  testimonialsData: Testimonial[];
  constructor(testimonialsService: TestimonialsService) {
    this.testimonialsData = testimonialsService.data;
    
   }

  private array0to(limit: number){
    return Array(limit).fill(0).map((x,i)=>i);
  } 

  ngOnInit() {
    // console.log(this.limit);
  }

}
