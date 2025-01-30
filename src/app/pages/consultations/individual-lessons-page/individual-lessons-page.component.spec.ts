import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualLessonsPageComponent } from './individual-lessons-page.component';

describe('IndividualLessonsPageComponent', () => {
  let component: IndividualLessonsPageComponent;
  let fixture: ComponentFixture<IndividualLessonsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndividualLessonsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualLessonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
