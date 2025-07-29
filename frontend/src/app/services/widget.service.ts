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
      type,
      cols: 3,
      rows: 3,
      x: 0,
      y: 0,
    };

    const currentWidgets = this.widgetsSubject.value;
    this.widgetsSubject.next([...currentWidgets, newWidget]);
  }
}
