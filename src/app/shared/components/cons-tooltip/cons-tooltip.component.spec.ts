import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsTooltipComponent } from './cons-tooltip.component';

describe('ConsTooltipComponent', () => {
  let component: ConsTooltipComponent;
  let fixture: ComponentFixture<ConsTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsTooltipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
