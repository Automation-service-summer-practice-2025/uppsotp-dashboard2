import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  NotificationService,
  Notification,
} from '../../services/notification.service';

@Component({
  selector: 'notification-panel',
  standalone: true,
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationPanel implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private notificationsSub?: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationsSub = this.notificationService.notifications$.subscribe(
      (notifications) => {
        this.notifications = notifications;
      }
    );
  }

  ngOnDestroy(): void {
    this.notificationsSub?.unsubscribe();
  }

  closeNotification(id: string): void {
    this.notificationService.removeNotification(id);
  }
}
