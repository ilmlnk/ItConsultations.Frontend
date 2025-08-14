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
  private readonly maxVisibleNotifications = 3;

  constructor() {}

  get visibleNotifications(): Observable<ToasterNotification[]> {
    return this.visibleNotifications$.asObservable();
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
    const notificationToRemove = allNotifications.find((n) => n.id === id);

    if (notificationToRemove?.timeoutId) {
      clearTimeout(notificationToRemove.timeoutId);
    }

    const filteredNotifications = allNotifications.filter((n) => n.id !== id);
    this.notifications$.next(filteredNotifications);

    this.updateVisibleNotifications();
  }

  closeAllNotifications() {
    this.notifications$.next([]);
    this.visibleNotifications$.next([]);
  }

  resumeNotification(id: string) {
    const allNotifications = this.notifications$.value;
    const notification = allNotifications.find((n) => n.id === id);

    if (
      notification?.isPaused &&
      notification.pausedAt &&
      notification.duration
    ) {
      const elapsed = notification.pausedAt - notification.timestamp.getTime();
      const remaining = notification.duration - elapsed;

      if (remaining > 0) {
        notification.timeoutId = setTimeout(() => {
          this.closeNotification(id);
        }, remaining);
      }

      notification.isPaused = false;
      delete notification.pausedAt;

      this.updateNotificationInArray(notification);
    }
  }

  pauseNotification(id: string) {
    const allNotifications = this.notifications$.value;
    const notification = allNotifications.find((n) => n.id === id);

    if (notification?.timeoutId) {
      clearTimeout(notification.timeoutId);
      notification.isPaused = true;
      notification.pausedAt = Date.now();

      this.updateNotificationInArray(notification);
    }
  }

  private addNotification(
    notification: Omit<ToasterNotification, 'id' | 'timestamp'>
  ): string {
    const id = this.generateId();
    const newNotification: ToasterNotification = {
      ...notification,
      id,
      timestamp: new Date(),
      duration: 8000
    };

    const allNotifications = [...this.notifications$.value, newNotification];
    this.notifications$.next(allNotifications);

    this.updateVisibleNotifications();

    if (newNotification.duration && newNotification.duration > 0) {
      const timeoutId = setTimeout(() => {
        this.closeNotification(id);
      }, newNotification.duration);

      this.updateNotificationInArray({ ...newNotification, timeoutId });
    }

    return id; 
  }

  private showNotificationWithAction(
    title: string,
    message: string,
    actionText: string,
    actionCallback: () => void,
    type: NotificationType.Info,
    duration: number = 0
  ) {
    return this.addNotification({
      title,
      message,
      type,
      duration,
      action: {
        text: actionText,
        callback: actionCallback,
      },
    });
  }

  private updateNotificationInArray(updatedNotification: ToasterNotification) {
    const allNotifications = this.notifications$.value.map((n) =>
      n.id === updatedNotification.id ? { ...updatedNotification } : n
    );
    this.notifications$.next(allNotifications);
    this.updateVisibleNotifications();
  }

  private updateVisibleNotifications() {
    const allNotifications = this.notifications$.value;
    const newestNotifications = allNotifications.slice(-this.maxVisibleNotifications);
    this.visibleNotifications$.next(newestNotifications);
  }

  private generateId() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }
}
