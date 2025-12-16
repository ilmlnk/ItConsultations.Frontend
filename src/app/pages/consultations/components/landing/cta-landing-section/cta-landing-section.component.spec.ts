import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaLandingSectionComponent } from './cta-landing-section.component';

describe('CtaLandingSectionComponent', () => {
  let component: CtaLandingSectionComponent;
  let fixture: ComponentFixture<CtaLandingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CtaLandingSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtaLandingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
