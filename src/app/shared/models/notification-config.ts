import { HorizontalPositionType } from "../enums/notification-position.enum";

export interface NotificationConfig {
    duration?: number;
    action?: string;
    horizontalPosition?: HorizontalPositionType;
    verticalPosition?: 'top' | 'bottom';
    panelClasses?: string[];
}