import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NotificationType } from '../../enums/notification-type.enum';
import { NotificationConfig } from '../../models/notification-config';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private readonly _defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom'
  }

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string, config?: NotificationConfig) {
    return this.show(message, NotificationType.Success, config);
  }

  showError(message: string, config?: NotificationConfig) {
    return this.show(message, NotificationType.Error, config);
  }

  showWarning(message: string, config?: NotificationConfig) {
    return this.show(message, NotificationType.Warning, config);
  }

  showInfo(message: string, config?: NotificationConfig) {
    return this.show(message, NotificationType.Info, config);
  }

  dismissAll() {
    this.snackBar.dismiss();
  }

  private show(
    message: string,
    type: NotificationType,
    config?: NotificationConfig
  ): MatSnackBarRef<SimpleSnackBar> {
    const snackBarConfig: MatSnackBarConfig = {
      ...this._defaultConfig,
      ...config,
      panelClass: this.getPanelClass(type, config?.panelClasses)
    }

    return this.snackBar.open(
      message,
      config?.action || 'Close',
      snackBarConfig
    )
  }

  private getPanelClass(type: NotificationType, customClasses?: string[]): string[] {
    const baseClass = `notification-${type}`;
    const classes = [baseClass];
    
    if (customClasses) {
      if (typeof customClasses === 'string') {
        classes.push(customClasses);
      } else {
        classes.push(...customClasses);
      }
    }
    
    return classes;
  }
}
