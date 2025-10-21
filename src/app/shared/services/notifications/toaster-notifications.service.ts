import { Injectable } from '@angular/core';
import { NotificationType } from '../../enums/notification-type.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToasterNotification } from '../../models/toaster-notification';

@Injectable({
  providedIn: 'root',
})
export class ToasterNotificationsService {
  private notifications$ = new BehaviorSubject<ToasterNotification[]>([]);
  private visibleNotifications$ = new BehaviorSubject<ToasterNotification[]>([]);

  constructor() { }

  get visibleNotifications(): Observable<ToasterNotification[]> {
    return this.notifications$.asObservable();
  }

  get allNotifications(): Observable<ToasterNotification[]> {
    return this.notifications$.asObservable();
  }

  get totalCount(): number {
    return this.notifications$.value.length;
  }

  showSuccess(title: string, message: string) {
    return this.addNotification({
      title,
      message,
      type: NotificationType.Success,
    });
  }

  showError(title: string, message: string) {
    return this.addNotification({
      title,
      message,
      type: NotificationType.Error,
    });
  }

  showWarning(title: string, message: string) {
    return this.addNotification({
      title,
      message,
      type: NotificationType.Warning,
    });
  }

  showInfo(title: string, message: string) {
    return this.addNotification({
      title,
      message,
      type: NotificationType.Info,
    });
  }

  closeNotification(id: string) {
    const allNotifications = this.notifications$.value;
    const filteredNotifications = allNotifications.filter((n) => n.id !== id);
    this.notifications$.next(filteredNotifications);
  }

  closeAllNotifications() {
    this.notifications$.next([]);
    this.visibleNotifications$.next([]);
  }
  resumeNotification(id: string) {
    const allNotifications = [...this.notifications$.value];
    const notificationIndex = allNotifications.findIndex((n) => n.id === id);

    if (notificationIndex > -1) {
      const notification = allNotifications[notificationIndex];

      if (notification.isPaused && notification.duration) {
        const now = Date.now();
        const elapsed = notification.elapsedBeforePause || 0;
        const remaining = notification.duration - elapsed;

        if (remaining > 0) {
          notification.isPaused = false;
          notification.startTimestamp = now;
          notification.pausedAt = undefined;
          notification.timeoutId = setTimeout(() => {
            this.closeNotification(id);
          }, remaining);

          this.notifications$.next(allNotifications);
        } else {
          this.closeNotification(id);
        }
      }
    }
  }

  pauseNotification(id: string) {
    const allNotifications = [...this.notifications$.value];
    const notificationIndex = allNotifications.findIndex((n) => n.id === id);

    if (notificationIndex > -1) {
      const notification = allNotifications[notificationIndex];

      if (!notification.isPaused) {
        notification.isPaused = true;
        this.notifications$.next(allNotifications);
      }
    }
  }

  private addNotification(
    notification: Omit<ToasterNotification, 'id' | 'timestamp' | 'count'>
  ): string {
    let allNotifications = [...this.notifications$.value];
    const now = Date.now();

    const newNotification: ToasterNotification = {
      ...notification,
      id: this.generateId(),
      timestamp: new Date(now),
      duration: 8000,
      startTimestamp: now,
      elapsedBeforePause: 0
    };

    if (newNotification.duration && newNotification.duration > 0) {
      newNotification.timeoutId = setTimeout(() => {
        this.closeNotification(newNotification.id);
      }, newNotification.duration);
    }

    allNotifications.push(newNotification);

    this.notifications$.next(allNotifications);

    return newNotification.id;
  }

  private generateId() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }
}
