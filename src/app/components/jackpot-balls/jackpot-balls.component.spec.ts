import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JackpotBallsComponent } from './jackpot-balls.component';

describe('JackpotBallsComponent', () => {
  let component: JackpotBallsComponent;
  let fixture: ComponentFixture<JackpotBallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JackpotBallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JackpotBallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
