import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySubscriptionPlanComponent } from './my-subscription-plan.component';

describe('MySubscriptionPlanComponent', () => {
  let component: MySubscriptionPlanComponent;
  let fixture: ComponentFixture<MySubscriptionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySubscriptionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySubscriptionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
