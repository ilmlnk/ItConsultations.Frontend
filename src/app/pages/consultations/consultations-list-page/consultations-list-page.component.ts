import { Component } from '@angular/core';
import { Consultation } from '../../../shared/models/consultation';
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

  items: MenuItem[] = [];
  consultations: any[] = [
    {
      id: 1,
      fullName: 'John Doe',
      position: 'Software Engineer',
      company: 'Tech Corp',
      topics: ['Angular', 'TypeScript'],
    },
    {
      id: 2,
      fullName: 'John Doe',
      position: 'Software Engineer',
      company: 'Tech Corp',
      topics: ['Angular', 'TypeScript'],
    },
    {
      id: 3,
      fullName: 'John Doe',
      position: 'Software Engineer',
      company: 'Tech Corp',
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
    this.loadConsultations();
  }
  userTypes: any[] = [
    { value: 'expanded', icon: 'pi pi-table' },
    { value: 'compact', icon: 'pi pi-list' }
  ];
  selectedUserType: string = 'expanded';

  searchValue: string = '';

  rowsOptions: number[] = [10, 20, 50];
  selectedRows: number = 10;

  selectedView: string = 'expanded';

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
