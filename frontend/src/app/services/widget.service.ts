import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Widget, WidgetConfig } from '../interfaces/widget.interface';
import { widgetConfigs } from '../configs/widget.config';
import { BackendApiService } from './backend-api.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private widgetsSubject = new BehaviorSubject<Widget[]>([]);
  widgets$ = this.widgetsSubject.asObservable();
  widgetConfigs: Record<string, WidgetConfig> = widgetConfigs;

  constructor(
    private backendApiService: BackendApiService,
    private notificationService: NotificationService
  ) {}

  createWidget(widgetType: string): void {
    const newWidget = new widgetConfigs[widgetType].Widget();
    this.widgetsSubject.next([...this.widgetsSubject.value, newWidget]);

    this.backendApiService.createWidget(newWidget).subscribe({
      next: () => {
        this.notificationService.showSuccess('Виджет успешно создан');
        console.info('Successfully saved widget');
      },
      error: (error) => {
        this.notificationService.showError('Ошибка создания виджета');
        console.error('Error creating widget: ', error.message);
      },
    });
  }

  readWidgets(): void {
    this.backendApiService.getWidgets().subscribe({
      next: (widgets) => {
        this.widgetsSubject.next(widgets);
      },
      error: (error) => {
        this.notificationService.showError('Ошибка загрузки виджетов');
        console.error('Error reading widgets:', error);
      },
    });
  }

  updateWidget(widget: Widget): void {
    this.backendApiService.updateWidget(widget).subscribe({
      next: () => {
        this.notificationService.showSuccess('Изменения виджета сохранены');
        console.info('Successfully saved widget changes');
      },
      error: (error) => {
        this.notificationService.showError(
          'Ошибка сохранения изменений виджета'
        );
        console.error('Error updating widget: ', error);
      },
    });
  }

  deleteWidget(currentWidget: Widget): void {
    this.widgetsSubject.next([
      ...this.widgetsSubject.value.filter(
        (widget) => widget.id !== currentWidget.id
      ),
    ]);

    this.backendApiService.deleteWidget(currentWidget).subscribe({
      next: () => {
        this.notificationService.showSuccess('Виджет успешно удален');
        console.info('Successfully deleted widget');
      },
      error: (error) => {
        this.notificationService.showError('Ошибка удаления виджета');
        console.error('Error deleting widget: ', error);
      },
    });
  }
}
