import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsPageRootComponent } from './consultations-page-root.component';

describe('ConsultationsPageRootComponent', () => {
  let component: ConsultationsPageRootComponent;
  let fixture: ComponentFixture<ConsultationsPageRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultationsPageRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationsPageRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
