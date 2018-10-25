import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyndicateComparisonComponent } from './syndicate-comparison.component';

describe('SyndicateComparisonComponent', () => {
  let component: SyndicateComparisonComponent;
  let fixture: ComponentFixture<SyndicateComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyndicateComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyndicateComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
