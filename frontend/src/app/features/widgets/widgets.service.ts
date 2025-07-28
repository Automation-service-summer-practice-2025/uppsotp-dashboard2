import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DashboardWidget } from './widgets.interface';
import { v4 as uuidv4 } from 'uuid';
import { widgetDefaultConfigs } from './widget-defaults';

@Injectable({ providedIn: 'root' })
export class WidgetsService {
  private widgets = new BehaviorSubject<DashboardWidget[]>([]);
  public widgets$ = this.widgets.asObservable();

  addWidget(widgetType: string) {
    const widgetConfig = widgetDefaultConfigs[widgetType];

    const newWidget = {
      id: uuidv4(),
      type: widgetType,
      x: 0,
      y: 0,
      cols: widgetConfig.cols,
      rows: widgetConfig.rows,
      data: widgetConfig.data,
    };
    const current = this.widgets.value;
    this.widgets.next([...current, newWidget]);
  }
}
