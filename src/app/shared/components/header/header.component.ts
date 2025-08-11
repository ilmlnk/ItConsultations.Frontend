import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode/dark-mode.service';

@Component({
  selector: 'cons-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private destroy$ = new Subject<void>();

  notificationCount = 3;
  notifications = [];

  constructor(public themeService: DarkModeService) {
    this.themeService.isDarkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDark => {
        console.log('Application theme:', isDark ? 'Dark' : 'Light');
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  markAllAsRead() {

  }

  openNotification(notification: any) {

  }

  getNotificationIcon(notificationType: any) {

  }

  viewAllNotifications() {

  }

  navigateToProfile() {

  }

  navigateToSettings() {

  }

  navigateToHelp() {

  }

  logout() {

  }

  get beta() {
    return "BETA";
  }
}
