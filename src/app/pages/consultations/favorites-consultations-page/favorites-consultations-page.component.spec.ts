import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesConsultationsPageComponent } from './favorites-consultations-page.component';

describe('FavoritesConsultationsPageComponent', () => {
  let component: FavoritesConsultationsPageComponent;
  let fixture: ComponentFixture<FavoritesConsultationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesConsultationsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesConsultationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
