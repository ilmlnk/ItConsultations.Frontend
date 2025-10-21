import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStudentPageComponent } from './register-page.component';

describe('RegisterStudentPageComponent', () => {
  let component: RegisterStudentPageComponent;
  let fixture: ComponentFixture<RegisterStudentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterStudentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterStudentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
