import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersPopupComponent } from './offers-popup.component';

describe('OffersPopupComponent', () => {
  let component: OffersPopupComponent;
  let fixture: ComponentFixture<OffersPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
