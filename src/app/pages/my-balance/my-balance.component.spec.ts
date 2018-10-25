import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBalanceComponent } from './my-balance.component';

describe('MyBalanceComponent', () => {
  let component: MyBalanceComponent;
  let fixture: ComponentFixture<MyBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
