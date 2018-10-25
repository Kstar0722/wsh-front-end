import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JackpotSumComponent } from './jackpot-sum.component';

describe('JackpotSumComponent', () => {
  let component: JackpotSumComponent;
  let fixture: ComponentFixture<JackpotSumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JackpotSumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JackpotSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
