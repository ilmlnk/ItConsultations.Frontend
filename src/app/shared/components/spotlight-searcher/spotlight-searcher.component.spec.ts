import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotlightSearcherComponent } from './spotlight-searcher.component';

describe('SpotlightSearcherComponent', () => {
  let component: SpotlightSearcherComponent;
  let fixture: ComponentFixture<SpotlightSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpotlightSearcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotlightSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
