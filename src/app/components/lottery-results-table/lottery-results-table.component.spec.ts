import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryResultsTableComponent } from './lottery-results-table.component';

describe('LotteryResultsTableComponent', () => {
  let component: LotteryResultsTableComponent;
  let fixture: ComponentFixture<LotteryResultsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryResultsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryResultsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
