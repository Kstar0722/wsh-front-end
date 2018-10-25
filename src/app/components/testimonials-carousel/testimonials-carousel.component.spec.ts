import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsCarouselComponent } from './testimonials-carousel.component';

describe('TestimonialsCarouselComponent', () => {
  let component: TestimonialsCarouselComponent;
  let fixture: ComponentFixture<TestimonialsCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialsCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
