import { Component } from '@angular/core';
import { Consultation } from '../../../shared/models/model/consultation.model';
import { ConsultationsService } from '../../../shared/services/consultations/consultations.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'cons-consultations-list-page',
  standalone: false,
  templateUrl: './consultations-list-page.component.html',
  styleUrl: './consultations-list-page.component.scss',
})
export class ConsultationsListPageComponent {
  isBookingModalOpen: boolean = false;
  selectedConsultation!: Consultation;
  selectedConsultations: any[] = [];
  exportItems: MenuItem[] = [];

  items: MenuItem[] = [];
  consultations: any[] = [
    {
      id: 1,
      fullName: 'John Doe',
      position: 'Software Engineer',
      company: 'Tech Corp',
      price: 100,
      topics: ['Angular', 'TypeScript'],
    },
    {
      id: 2,
      fullName: 'John Doe',
      position: 'Software Engineer',
      company: 'Tech Corp',
      price: 150,
      topics: ['Angular', 'TypeScript'],
    },
    {
      id: 3,
      fullName: 'John Doe',
      position: 'Software Engineer',
      company: 'Tech Corp',
      price: 200,
      topics: ['Angular', 'TypeScript'],
    },
  ];

  constructor(private _consultationService: ConsultationsService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-microsoft',
        routerLink: '/dashboard'
      },
      {
        label: 'Create a Consultation',
        icon: 'pi pi-fw pi-plus',
        expanded: false
      },
      {
        label: 'Consultations',
        icon: 'pi pi-fw pi-book',
        expanded: true,
        items: [
          {
            label: 'Manage Consultations',
            icon: 'pi pi-fw pi-folder',
            styleClass: 'active-menu-item'
          },
          {
            label: 'Recordings',
            icon: 'pi pi-fw pi-video'
          },
          {
            label: 'Consultations List',
            icon: 'pi pi-fw pi-graduation-cap'
          },
          {
            label: 'Calendar',
            icon: 'pi pi-fw pi-calendar'
          }
        ]
      },
      {
        label: 'Communication',
        icon: 'pi pi-fw pi-envelope',
        expanded: true,
        items: [
          {
            label: 'Messenger',
            icon: 'pi pi-fw pi-send',
            styleClass: 'active-menu-item'
          },
          {
            label: 'Network',
            icon: 'pi pi-fw pi-users'
          },
          {
            label: 'Forum',
            icon: 'pi pi-fw pi-globe'
          }
        ]
      },
      {
        label: 'Handbook',
        icon: 'pi pi-fw pi-address-book'
      }
    ];

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
    this.loadConsultations();
  }
  userTypes: any[] = [
    { value: 'expanded', icon: 'pi pi-table', label: 'Grid' },
    { value: 'compact', icon: 'pi pi-list', label: 'List' }
  ];
  selectedUserType: string = 'expanded';

  searchValue: string = '';

  rowsOptions: number[] = [10, 20, 50];
  rows: number = 10;
  first: number = 0;

  onPageChange(event: any) {
      this.first = event.first;
      this.rows = event.rows;
  }

  selectedView: string = 'expanded';

  exportPdf() { console.log('Exporting PDF', this.selectedConsultations); }
  exportExcel() { console.log('Exporting Excel', this.selectedConsultations); }
  exportCsv() { console.log('Exporting CSV', this.selectedConsultations); }

  onCloseBookingModal() {
    this.isBookingModalOpen = false;

    this.enableBodyScroll();
  }

  private enableBodyScroll() {
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('--scrollbar-width');
  }

  private loadConsultations() {
    this._consultationService.getConsultations().subscribe((data: Consultation[]) => {
      this.consultations = data;
    });
  }
}
