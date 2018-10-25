import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryResultsComponent } from './lottery-results.component';

describe('LotteryResultsComponent', () => {
  let component: LotteryResultsComponent;
  let fixture: ComponentFixture<LotteryResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
