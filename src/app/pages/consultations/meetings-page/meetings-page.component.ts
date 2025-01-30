import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-meetings-page',
  standalone: false,
  
  templateUrl: './meetings-page.component.html',
  styleUrl: './meetings-page.component.scss'
})
export class MeetingsPageComponent {
  @Input() meetingCode: string;

  createMeeting() {
    const meetingLink = this.generateMeetingLink();
  }

  startInstantMeeting() {

  }

  planMeetingInCalendar() {

  }

  private generateMeetingLink(): string {
    return `https://cons.com/meet/${Math.random().toString(36).substring(2, 15)}`;
  }
}
