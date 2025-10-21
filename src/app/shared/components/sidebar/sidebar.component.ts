import { Component, inject, Input, QueryList, ViewChildren } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../../services/auth/auth.service';

export interface MenuItem {
  title: string;
  route?: string;
  icon: string;
  tooltip: string;
  children?: MenuItem[];
}

@Component({
  selector: 'cons-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @ViewChildren(MatMenuTrigger) menuTriggers!: QueryList<MatMenuTrigger>;

  items: MenuItem[] = [
    { title: 'Dashboard', route: '/dashboard', icon: 'dashboard', tooltip: 'Dashboard' },
    { 
      title: 'Consultations', 
      icon: 'connect_without_contact', 
      tooltip: 'Consultations',
      children: [
        { title: 'Consultations', route: '/consultations-list', icon: 'connect_without_contact', tooltip: 'Consultations' },
        { title: 'Favorites', route: '/favorites', icon: 'favorite', tooltip: 'Favorites' }
      ]
    },
    { title: 'Coaches', route: '/coaches', icon: 'group', tooltip: 'Coaches' },
    { title: 'Students', route: '/students', icon: 'school', tooltip: 'Students' },
    { 
      title: 'Calendar', 
      icon: 'calendar_today', 
      tooltip: 'Calendar',
      children: [
        { title: 'View Calendar', route: '/calendar', icon: 'calendar_view_month', tooltip: 'View Calendar' },
        { title: 'Create Event', route: '/calendar/create', icon: 'event', tooltip: 'Create new event' },
        { title: 'My Events', route: '/calendar/my-events', icon: 'event_note', tooltip: 'My Events' }
      ]
    },
    { title: 'Achievements', route: '/achievements', icon: 'emoji_events', tooltip: 'Achievements' },
    { title: 'Network', route: '/network', icon: 'diversity_3', tooltip: 'Network' },
    { title: 'Messenger', route: '/messenger', icon: 'chat', tooltip: 'Messenger' },
    { 
      title: 'E-learning',  
      icon: 'menu_book', 
      tooltip: 'E-learning',
      children: [
        { title: 'Forum', route: '/forum', icon: 'forum', tooltip: 'Forum' },
        { title: 'Individual Lessons', route: '/individual-lessons', icon: 'school', tooltip: 'Individual Lessons' },
        { title: 'Handbook', route: '/handbook', icon: 'book', tooltip: 'Handbook' }
      ]}
  ];

  private _authService: AuthService = inject(AuthService);

  getMenuId(index: number): string {
    return `menu-${index}`;
  }

  isParentActive(item: MenuItem): boolean {
    if (!item.children) { 
      return false; 
    }
    
    return item.children.some(child => 
      child.route && window.location.pathname === child.route
    );
  }

  onMenuItemClick(event: Event, item: MenuItem): void {
    if (item.children && item.children.length > 0) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  getParentActiveClass(item: MenuItem): string {
    return this.isParentActive(item) ? 'active' : '';
  }

  trackByFn(index: number, item: MenuItem): any {
    return item.title || index;
  }

  trackByChildFn(index: number, child: MenuItem): any {
    return child.title || index;
  }

  hasMenuActions(item: MenuItem): boolean {
    return item.title === 'Calendar' || item.title === 'Consultations';
  }

  onChildItemClick(child: any, item: any) {

  }

  onMenuAction(item: any) {

  }

  get isAuthenticated(): boolean {
    return this._authService.isAuthenticated;
  }
}
