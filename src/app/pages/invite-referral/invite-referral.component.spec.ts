import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteReferralComponent } from './invite-referral.component';

describe('InviteReferralComponent', () => {
  let component: InviteReferralComponent;
  let fixture: ComponentFixture<InviteReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteReferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
