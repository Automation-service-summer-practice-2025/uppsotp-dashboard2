import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Widget, WidgetConfig } from '../interfaces/widget.interface';
import { widgetConfigs } from '../configs/widget.config';
import { BackendApiService } from './backend-api.service';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private widgetsSubject = new BehaviorSubject<Widget[]>([]);
  widgets$ = this.widgetsSubject.asObservable();
  widgetConfigs: Record<string, WidgetConfig> = widgetConfigs;

  constructor(private backendApiService: BackendApiService) {}

  createWidget(widgetType: string): void {
    const newWidget = new widgetConfigs[widgetType].Widget();
    this.widgetsSubject.next([...this.widgetsSubject.value, newWidget]);

    this.backendApiService.createWidget(newWidget).subscribe({
      next: () => {
        console.info('Successfully saved widget');
      },
      error: (error) => {
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
        console.error('Error reading widgets:', error);
        this.widgetsSubject.next([]);
      },
    });
  }

  updateWidget(widget: Widget): void {
    this.backendApiService.updateWidget(widget).subscribe({
      next: () => {
        console.info('Successfully saved widget changes');
      },
      error: (error) => {
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
        console.info('Successfully deleted widget');
      },
      error: (error) => {
        console.error('Error deleting widget: ', error);
      },
    });
  }
}
