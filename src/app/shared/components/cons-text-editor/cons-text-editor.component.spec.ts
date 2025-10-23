import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsTextEditorComponent } from './cons-text-editor.component';

describe('ConsTextEditorComponent', () => {
  let component: ConsTextEditorComponent;
  let fixture: ComponentFixture<ConsTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsTextEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
