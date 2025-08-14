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

  loadWidgets(): void {
    this.backendApiService.getWidgets().subscribe({
      next: (widgets) => {
        this.widgetsSubject.next(widgets);
      },
      error: (error) => {
        console.log('Error loading widgets:', error);
        this.widgetsSubject.next([]);
      },
    });
  }

  addWidget(widgetType: string): void {
    const newWidget = new widgetConfigs[widgetType].Widget();
    this.widgetsSubject.next([...this.widgetsSubject.value, newWidget]);
  }

  delWidget(currentWidget: Widget): void {
    this.widgetsSubject.next([
      ...this.widgetsSubject.value.filter(
        (widget) => widget.id !== currentWidget.id
      ),
    ]);
  }
}
