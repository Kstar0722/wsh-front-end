import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalNotifyComponent } from './renewal-notify.component';

describe('RenewalNotifyComponent', () => {
  let component: RenewalNotifyComponent;
  let fixture: ComponentFixture<RenewalNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
