import { ChangeDetectorRef, Component } from '@angular/core';
import { ToasterNotificationsService } from '../../services/notifications/toaster-notifications.service';
import { ToasterNotification } from '../../models/toaster-notification';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { NotificationType } from '../../enums/notification-type.enum';

@Component({
  selector: 'cons-toaster-notification',
  standalone: false,
  templateUrl: './toaster-notification.component.html',
  styleUrl: './toaster-notification.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms cubic-bezier(0.4, 0.2, 0.2, 1)',
          style({ transform: 'translateX(0)', opacity: 1 })
        )
      ]),
      transition(':leave', [
        animate('250ms cubic-bezier(0.4, 0.2, 0.2, 1)',
          style({ transform: 'translateX(100%)', opacity: 0 })
        )
      ])
    ])
  ]
})
export class ToasterNotificationComponent {
  notifications: ToasterNotification[] = [];
  showCloseAllNotifications: boolean = false;
  
  private subscription = new Subscription();

  constructor(
    private toasterNotificationService: ToasterNotificationsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.toasterNotificationService.visibleNotifications.subscribe(notifications => {
        this.notifications = notifications;
        this.showCloseAllNotifications = notifications.length >= 3;
        this.cdr.detectChanges();
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getNotificationIcon(type: NotificationType): string {
    const iconMap = {
      [NotificationType.Success]: 'check_circle',
      [NotificationType.Error]: 'error',
      [NotificationType.Warning]: 'warning',
      [NotificationType.Info]: 'info'
    };
    return iconMap[type];
  }

  pauseProgress(notification: ToasterNotification) {
    if (notification.duration && notification.duration > 0) {
      this.toasterNotificationService.pauseNotification(notification.id);
    }
  }

  resumeProgress(notification: ToasterNotification) {
    if (notification.duration && notification.duration > 0) {
      this.toasterNotificationService.resumeNotification(notification.id);
    }
  }

  closeNotification(id: string, event: Event) {
    event.stopPropagation();
    this.toasterNotificationService.closeNotification(id);
  }

  closeAllNotifications() {
    this.toasterNotificationService.closeAllNotifications();
  }

  trackById(index: number, n: ToasterNotification) {
    return n.id;
  }
}
