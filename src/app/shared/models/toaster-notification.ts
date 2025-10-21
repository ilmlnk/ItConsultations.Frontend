import { NotificationType } from '../enums/notification-type.enum';

export interface ToasterNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
  duration?: number;
  isVisible?: boolean;
  isPaused?: boolean;
  pausedAt?: number;
  count?: number;
  startTimestamp?: number;
  elapsedBeforePause?: number;
  timeoutId?: any;
}
