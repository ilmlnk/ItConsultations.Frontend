import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsDatePickerComponent } from './date-picker.component';

describe('DatePickerComponent', () => {
  let component: ConsDatePickerComponent;
  let fixture: ComponentFixture<ConsDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsDatePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
