import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsReComponent } from './sms-re.component';

describe('SmsReComponent', () => {
  let component: SmsReComponent;
  let fixture: ComponentFixture<SmsReComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsReComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsReComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
