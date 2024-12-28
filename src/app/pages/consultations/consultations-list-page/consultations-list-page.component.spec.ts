import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsListPageComponent } from './consultations-list-page.component';

describe('ConsultationsListPageComponent', () => {
  let component: ConsultationsListPageComponent;
  let fixture: ComponentFixture<ConsultationsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultationsListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
