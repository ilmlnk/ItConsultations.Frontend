import { Component, inject } from '@angular/core';
import { ToasterNotificationsService } from '../../services/notifications/toaster-notifications.service';
import { ToasterNotification } from '../../models/toaster-notification';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { NotificationType } from '../../enums/notification-type.enum';
import { KeyValue } from '@angular/common';

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
  allNotifications: ToasterNotification[] = [];
  notificationStacks: { [key: string]: ToasterNotification[] } = {};

  showCloseAllNotifications: boolean = false;
  
  private subscription = new Subscription();
  private _toasterNotificationService = inject(ToasterNotificationsService);

  constructor() {}

  ngOnInit() {
    this.subscription.add(
      this._toasterNotificationService.visibleNotifications.subscribe(notifications => {
        this.notificationStacks = this.groupNotifications(notifications);
      })
    );
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
      this._toasterNotificationService.pauseNotification(notification.id);
    }
  }

  resumeProgress(notification: ToasterNotification) {
    if (notification.duration && notification.duration > 0) {
      this._toasterNotificationService.resumeNotification(notification.id);
    }
  }

  closeNotification(id: string, event: Event) {
    event.stopPropagation();
    this._toasterNotificationService.closeNotification(id);
  }

  closeAllNotifications() {
    this._toasterNotificationService.closeAllNotifications();
  }

  trackByType(index: number, stack: KeyValue<string, ToasterNotification[] | undefined>) {
    return stack.key;
  }

  trackById(index: number, n: ToasterNotification) {
    return n.timestamp.getTime();
  }

  private groupNotifications(notifications: ToasterNotification[]): { [key: string]: ToasterNotification[] } {
    return notifications.reduce((acc, notification) => {
      const key = `${notification.type}-${notification.title}-${notification.message}`;
      
      if (!acc[key]) {
        acc[key] = [];
      }
      
      acc[key].push(notification);
      return acc;
    }, {} as { [key: string]: ToasterNotification[] });
  }
}
