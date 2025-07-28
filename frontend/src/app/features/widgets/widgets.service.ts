import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DashboardWidget } from './widgets.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class WidgetsService {
  private widgets = new BehaviorSubject<DashboardWidget[]>([]);
  public widgets$ = this.widgets.asObservable();

  addWidget(widgetType: string) {
    const newWidget = {
      id: uuidv4(),
      type: widgetType,
      x: 0,
      y: 0,
      cols: 2,
      rows: 2,
      data: null, // можно потом заменить шаблоном для каждого типа
    };
    const current = this.widgets.value;
    this.widgets.next([...current, newWidget]);
  }
}
