import { Component, inject, Renderer2 } from '@angular/core';
import { Consultation } from '../../../shared/models/consultation';
import { ConsultationsService } from '../../../shared/services/consultations/consultations.service';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'cons-dashboard-page',
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

  currentUserRole: string;

  private _consultationService = inject(ConsultationsService);
  private _authService = inject(AuthService);

  constructor() {}

  ngOnInit() {
    this.loadRecentConsultations();
  }
  

  loadRecentConsultations() {
    
  }
}
