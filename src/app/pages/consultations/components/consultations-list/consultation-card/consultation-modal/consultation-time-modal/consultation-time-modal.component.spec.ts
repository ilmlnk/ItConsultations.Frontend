import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationTimeModalComponent } from './consultation-time-modal.component';

describe('ConsultationTimeModalComponent', () => {
  let component: ConsultationTimeModalComponent;
  let fixture: ComponentFixture<ConsultationTimeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultationTimeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationTimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
