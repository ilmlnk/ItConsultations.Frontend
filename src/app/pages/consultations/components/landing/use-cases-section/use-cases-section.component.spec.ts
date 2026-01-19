import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCasesSectionComponent } from './use-cases-section.component';

describe('UseCasesSectionComponent', () => {
  let component: UseCasesSectionComponent;
  let fixture: ComponentFixture<UseCasesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UseCasesSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseCasesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
