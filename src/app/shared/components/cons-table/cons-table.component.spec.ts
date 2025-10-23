import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsTableComponent } from './cons-table.component';

describe('ConsTableComponent', () => {
  let component: ConsTableComponent;
  let fixture: ComponentFixture<ConsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
