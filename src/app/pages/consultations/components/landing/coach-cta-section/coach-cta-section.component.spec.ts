import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachCtaSectionComponent } from './coach-cta-section.component';

describe('CoachCtaSectionComponent', () => {
  let component: CoachCtaSectionComponent;
  let fixture: ComponentFixture<CoachCtaSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoachCtaSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachCtaSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
