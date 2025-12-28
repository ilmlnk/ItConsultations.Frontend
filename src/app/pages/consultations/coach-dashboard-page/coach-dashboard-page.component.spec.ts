import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachDashboardPageComponent } from './coach-dashboard-page.component';

describe('CoachDashboardPageComponent', () => {
  let component: CoachDashboardPageComponent;
  let fixture: ComponentFixture<CoachDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoachDashboardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
