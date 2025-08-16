import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export interface Notification {
  id: string;
  message: string;
  type: 'error' | 'success' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  showNotification(
    message: string,
    type: Notification['type'] = 'info',
    duration: number = 5000
  ): void {
    const notification: Notification = {
      id: uuidv4(),
      message,
      type,
      duration,
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);

    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, duration);
    }
  }

  removeNotification(id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.filter(
      (notification) => notification.id !== id
    );
    this.notificationsSubject.next(updatedNotifications);
  }

  clearAll(): void {
    this.notificationsSubject.next([]);
  }

  showError(message: string, duration: number = 2000): void {
    this.showNotification(message, 'error', duration);
  }

  showSuccess(message: string, duration: number = 2000): void {
    this.showNotification(message, 'success', duration);
  }

  showWarning(message: string, duration: number = 2000): void {
    this.showNotification(message, 'warning', duration);
  }

  showInfo(message: string, duration: number = 2000): void {
    this.showNotification(message, 'info', duration);
  }
}
