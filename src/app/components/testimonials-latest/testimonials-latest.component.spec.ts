import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsLatestComponent } from './testimonials-latest.component';

describe('TestimonialsLatestComponent', () => {
  let component: TestimonialsLatestComponent;
  let fixture: ComponentFixture<TestimonialsLatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialsLatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialsLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
