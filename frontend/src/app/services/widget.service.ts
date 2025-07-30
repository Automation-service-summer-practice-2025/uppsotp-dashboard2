import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Widget } from '../interfaces/widget.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private widgetsSubject = new BehaviorSubject<Widget[]>([]);
  widgets$ = this.widgetsSubject.asObservable();

  addWidget(type: string): void {
    const newWidget: Widget = {
      id: uuidv4(),
      type: type,
      cols: 3,
      rows: 3,
      x: 0,
      y: 0,
    };

    this.widgetsSubject.next([...this.widgetsSubject.value, newWidget]);
  }

  delWidget(widgetId: string): void {
    this.widgetsSubject.next([
      ...this.widgetsSubject.value.filter((w) => w.id !== widgetId),
    ]);
  }
}
