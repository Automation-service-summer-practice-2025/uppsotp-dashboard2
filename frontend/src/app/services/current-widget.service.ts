import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Widget } from '../interfaces/widget.interface';
import { WidgetService } from './widget.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentWidgetService {
  private currentWidget = new BehaviorSubject<Widget | undefined>(undefined);

  currentWidget$ = this.currentWidget.asObservable();

  constructor(private widgetService: WidgetService) {}

  setCurrentWidget(widget: Widget): void {
    const previousWidget = this.getCurrentWidget();

    if (previousWidget && previousWidget.id !== widget?.id) {
      this.widgetService.updateWidget(previousWidget);
    }

    this.currentWidget.next(widget);
  }

  getCurrentWidget(): Widget | undefined {
    return this.currentWidget.getValue();
  }

  clearCurrentWidget(): void {
    const currentWidget = this.getCurrentWidget();

    if (currentWidget) {
      this.widgetService.updateWidget(currentWidget);
    }

    this.currentWidget.next(undefined);
  }
}
