import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserPreferencesService } from '../../../shared/services/user-preferences/user-preferences.service';

@Component({
  selector: 'cons-coaches-list-page',
  standalone: false,
  templateUrl: './coaches-list-page.component.html',
  styleUrl: './coaches-list-page.component.scss'
})
export class CoachesListPageComponent implements OnInit {
  userTypes: any[] = [
      { value: 'expanded', icon: 'pi pi-table', label: 'Grid' },
      { value: 'compact', icon: 'pi pi-list', label: 'List' }
  ];

  selectedUserType: string = 'expanded';

  searchValue: string = '';

  selectedCoaches: any[] = [];
  selectedCoach: any = null;
  exportItems: MenuItem[] = [];

  rowsOptions: number[] = [10, 20, 50];
  rows: number = 10;
  first: number = 0;

  private _userPreferencesService = inject(UserPreferencesService);

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  onViewModeChange(mode: string) {
    this.selectedUserType = mode; // Optimistic UI update
    this._userPreferencesService.setPreference('coaches-view-mode', mode); // Server-side update
  }

  onSelectCoach(coach: any) {
    this.selectedCoach = coach;
  }

  onBackToList() {
    this.selectedCoach = null;
  }

  ngOnInit() {
    this._userPreferencesService.getPreference('coaches-view-mode', 'expanded').subscribe(val => this.selectedUserType = val);

    this.exportItems = [
      {
        label: 'PDF',
        icon: 'pi pi-file-pdf',
        command: () => {
          this.exportPdf();
        }
      },
      {
        label: 'XLSX',
        icon: 'pi pi-file-excel',
        command: () => {
          this.exportExcel();
        }
      },
      {
        label: 'CSV',
        icon: 'pi pi-file',
        command: () => {
          this.exportCsv();
        }
      }
    ];
  }

  exportPdf() { console.log('Exporting PDF', this.selectedCoaches); }
  exportExcel() { console.log('Exporting Excel', this.selectedCoaches); }
  exportCsv() { console.log('Exporting CSV', this.selectedCoaches); }

  coaches: any[] = [
    {
      fullName: 'Jane Cooper',
      position: 'Senior Software Engineer',
      company: 'Google',
      topics: ['Angular', 'System Design', 'RxJS', 'TypeScript', 'UX/UI']
    },
    {
      fullName: 'Wade Warren',
      position: 'Tech Lead',
      company: 'Microsoft',
      topics: ['.NET', 'Azure', 'Microservices']
    },
    {
      fullName: 'Esther Howard',
      position: 'Product Manager',
      company: 'Amazon',
      topics: ['Product Management', 'Agile', 'Leadership']
    }
  ];

  // Mock consultations data for detail view
  getConsultationsForCoach(coach: any): any[] {
    // In a real app, you would filter by coach ID or fetch from API
    return [
      {
        id: 1,
        fullName: coach.fullName,
        position: coach.position,
        company: coach.company,
        price: 100,
        topics: [coach.topics[0], coach.topics[1] || 'General']
      },
      {
        id: 2,
        fullName: coach.fullName,
        position: coach.position,
        company: coach.company,
        price: 150,
        topics: [coach.topics[0], 'Career Advice']
      }
    ];
  }
}
