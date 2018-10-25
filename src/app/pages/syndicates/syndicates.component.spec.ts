import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyndicatesComponent } from './syndicates.component';

describe('SyndicatesComponent', () => {
  let component: SyndicatesComponent;
  let fixture: ComponentFixture<SyndicatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyndicatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyndicatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
