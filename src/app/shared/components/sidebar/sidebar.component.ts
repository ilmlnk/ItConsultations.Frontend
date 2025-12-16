import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'cons-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  items: MenuItem[] = [
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
    },
  ];

  private _authService: AuthService = inject(AuthService);
}
