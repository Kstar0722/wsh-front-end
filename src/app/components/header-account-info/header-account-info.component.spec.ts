import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAccountInfoComponent } from './header-account-info.component';

describe('HeaderAccountInfoComponent', () => {
  let component: HeaderAccountInfoComponent;
  let fixture: ComponentFixture<HeaderAccountInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAccountInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
