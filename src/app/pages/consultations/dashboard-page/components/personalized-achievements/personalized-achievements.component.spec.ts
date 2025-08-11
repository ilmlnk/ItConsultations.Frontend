import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizedAchievementsComponent } from './personalized-achievements.component';

describe('PersonalizedAchievementsComponent', () => {
  let component: PersonalizedAchievementsComponent;
  let fixture: ComponentFixture<PersonalizedAchievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalizedAchievementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalizedAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
