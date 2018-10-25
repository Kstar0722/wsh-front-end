import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaymentCardComponent } from './update-payment-card.component';

describe('UpdatePaymentCardComponent', () => {
  let component: UpdatePaymentCardComponent;
  let fixture: ComponentFixture<UpdatePaymentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePaymentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePaymentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
