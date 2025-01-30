import { Component } from '@angular/core';
import { CalendarOptions, ViewApi } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'cons-calendar-page',
  standalone: false,

  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss'
})
export class CalendarPageComponent {
  eventsList = {

  };

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin],
    height: '835px',
    nowIndicator: true,
    editable: true,
    dayHeaderFormat: { weekday: 'short' },
    headerToolbar: {
      right: 'addEvent timeGridDay,timeGridWeek,dayGridMonth prev,next today'
    },
    dayHeaderContent: (info) => this.getDayHeaderContent(info, 'dayGridMonth'),
    viewDidMount: (viewInfo) => this.updateDayHeaderFormat(viewInfo.view),
    buttonText: {
      today: "Today",
      day: "Day",
      week: "Week",
      month: "Month"
    },
    customButtons: {
      addEvent: {
        text: 'Add event'
      }
    },
    events: this.eventsList
  }

  private getDayHeaderContent(info: any, viewType: string) {
    if (viewType === 'dayGridWeek') {
      const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      const date = new Date(info.date);
      const day = daysOfWeek[date.getDay()];
      const num = date.getDate();
      return `${day}, ${num}`;
    }

    return info.text;
  }

  private updateDayHeaderFormat(view: ViewApi) {
    this.calendarOptions = {
      ...this.calendarOptions,
      dayHeaderContent: (info) => this.getDayHeaderContent(info, view.type)
    };
  }
}
