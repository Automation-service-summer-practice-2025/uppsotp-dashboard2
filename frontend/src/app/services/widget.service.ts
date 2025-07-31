import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Widget } from '../interfaces/widget.interface';
import { widgetFactories } from '../configs/widget-factory';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private widgetsSubject = new BehaviorSubject<Widget[]>([]);
  widgets$ = this.widgetsSubject.asObservable();

  addWidget(widgetType: string): void {
    const newWidget = widgetFactories[widgetType]();
    this.widgetsSubject.next([...this.widgetsSubject.value, newWidget]);
  }

  delWidget(widgetId: string): void {
    this.widgetsSubject.next([
      ...this.widgetsSubject.value.filter((widget) => widget.id !== widgetId),
    ]);
  }
}
