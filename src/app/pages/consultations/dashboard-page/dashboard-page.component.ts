import { Component, Renderer2 } from '@angular/core';
import { Consultation } from '../../../shared/models/consultation';
import { ConsultationsService } from '../../../shared/services/consultations/consultations.service';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-dashboard-page',
  standalone: false,
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin],
    nowIndicator: true,
    height: '500px'
  }
  recentConsultations: Consultation[] = [];
  favoriteConsultations: Consultation[] = [];
  recommendedConsultations: Consultation[] = [];
  userId = '1Ao5';

  constructor(
    private consultationService: ConsultationsService, 
    private renderer: Renderer2
  ) {}
  ngOnInit() {
    this.loadRecentConsultations();
  }
  

  loadRecentConsultations() {
    this.consultationService.getRecentConsultations(this.userId)
      .subscribe({
        next: (data) => this.recentConsultations = data,
        error: (err) => console.error('Error', err)
      });
  }

  /*addLiveTimeIndicator(): void {
    const calendarEl = document.querySelector('.fc-timegrid-slots');
    if (!calendarEl) return;

    const timeIndicator = this.renderer.createElement('div');
    this.renderer.setStyle(timeIndicator, 'position', 'absolute');
    this.renderer.setStyle(timeIndicator, 'top', this.getTimePosition() + 'px');
    this.renderer.setStyle(timeIndicator, 'left', '0');
    this.renderer.setStyle(timeIndicator, 'right', '0');
    this.renderer.setStyle(timeIndicator, 'height', '2px');
    this.renderer.setStyle(timeIndicator, 'background', 'red');
    this.renderer.setStyle(timeIndicator, 'z-index', '10');

    this.renderer.appendChild(calendarEl, timeIndicator);

    setInterval(() => {
      this.renderer.setStyle(timeIndicator, 'top', this.getTimePosition() + 'px');
    }, 60000);
  }

  getTimePosition(): number {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const elapsedMinutes = (new Date().getTime() - startOfDay.getTime()) / 60000;
    const slotHeight = 50;
    return (elapsedMinutes / 30) * slotHeight;
  }*/
}
