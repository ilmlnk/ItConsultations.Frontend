import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeWarpLinesComponent } from './three-warp-lines.component';

describe('ThreeWarpLinesComponent', () => {
  let component: ThreeWarpLinesComponent;
  let fixture: ComponentFixture<ThreeWarpLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreeWarpLinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeWarpLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
