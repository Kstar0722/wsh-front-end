import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBonusesComponent } from './my-bonuses.component';

describe('MyBonusesComponent', () => {
  let component: MyBonusesComponent;
  let fixture: ComponentFixture<MyBonusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBonusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBonusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
