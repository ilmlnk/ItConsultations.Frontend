export interface NotificationConfig {
    duration?: number;
    action?: string;
    horizontalPosition?: 'start' | 'center' | 'end' | 'left' | 'right';
    verticalPosition?: 'top' | 'bottom';
    panelClasses?: string[];
}