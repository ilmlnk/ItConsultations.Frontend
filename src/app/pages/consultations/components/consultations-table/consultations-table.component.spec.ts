import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsTableComponent } from './consultations-table.component';

describe('ConsultationsTableComponent', () => {
  let component: ConsultationsTableComponent;
  let fixture: ComponentFixture<ConsultationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultationsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
