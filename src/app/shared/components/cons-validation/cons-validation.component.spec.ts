import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsValidationComponent } from './cons-validation.component';

describe('ConsValidationComponent', () => {
  let component: ConsValidationComponent;
  let fixture: ComponentFixture<ConsValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
