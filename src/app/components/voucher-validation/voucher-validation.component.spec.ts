import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherValidationComponent } from './voucher-validation.component';

describe('VoucherValidationComponent', () => {
  let component: VoucherValidationComponent;
  let fixture: ComponentFixture<VoucherValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
