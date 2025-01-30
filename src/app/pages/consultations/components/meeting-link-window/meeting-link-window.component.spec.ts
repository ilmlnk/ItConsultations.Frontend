import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingLinkWindowComponent } from './meeting-link-window.component';

describe('MeetingLinkWindowComponent', () => {
  let component: MeetingLinkWindowComponent;
  let fixture: ComponentFixture<MeetingLinkWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetingLinkWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingLinkWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
