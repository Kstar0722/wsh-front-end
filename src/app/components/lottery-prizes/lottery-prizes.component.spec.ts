import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryPrizesComponent } from './lottery-prizes.component';

describe('LotteryPrizesComponent', () => {
  let component: LotteryPrizesComponent;
  let fixture: ComponentFixture<LotteryPrizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryPrizesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryPrizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
