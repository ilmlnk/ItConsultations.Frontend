import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRecordingsPageComponent } from './meeting-recordings-page.component';

describe('MeetingRecordingsPageComponent', () => {
  let component: MeetingRecordingsPageComponent;
  let fixture: ComponentFixture<MeetingRecordingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetingRecordingsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingRecordingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
