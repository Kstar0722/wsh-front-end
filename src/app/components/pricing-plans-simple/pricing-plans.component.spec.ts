import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPlansSimpleComponent } from './pricing-plans-simple.component';

describe('PricingPlansComponent', () => {
  let component: PricingPlansSimpleComponent;
  let fixture: ComponentFixture<PricingPlansSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingPlansSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingPlansSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
