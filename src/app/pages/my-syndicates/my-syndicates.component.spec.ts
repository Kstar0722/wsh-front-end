import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySyndicatesComponent } from './my-syndicates.component';

describe('MySyndicatesComponent', () => {
  let component: MySyndicatesComponent;
  let fixture: ComponentFixture<MySyndicatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySyndicatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySyndicatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
