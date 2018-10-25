import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityInfographicComponent } from './community-infographic.component';

describe('CommunityInfographicComponent', () => {
  let component: CommunityInfographicComponent;
  let fixture: ComponentFixture<CommunityInfographicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityInfographicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityInfographicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
