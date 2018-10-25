import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionAgreementComponent } from './subscription-agreement.component';

describe('SubscriptionAgreementComponent', () => {
  let component: SubscriptionAgreementComponent;
  let fixture: ComponentFixture<SubscriptionAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
