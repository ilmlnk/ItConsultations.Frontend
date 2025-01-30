import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandbookPageComponent } from './handbook-page.component';

describe('HandbookPageComponent', () => {
  let component: HandbookPageComponent;
  let fixture: ComponentFixture<HandbookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandbookPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandbookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
