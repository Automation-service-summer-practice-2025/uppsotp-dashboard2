import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { WidgetSideBarBtn } from '../../interfaces/widget-sb-btn.interface';
import { widgetSbBtnsConfig } from '../../configs/widget-sb-btn.config';
import { Zoom } from '../zoom/zoom';

@Component({
  selector: 'widget-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Zoom],
  templateUrl: './widget-sidebar.html',
  styleUrl: './widget-sidebar.css',
})
export class WidgetSidebar {
  buttons: WidgetSideBarBtn[] = widgetSbBtnsConfig;

  addWidget(type: string) {
    console.log(`Добавление виджета типа: ${type}`);
    // Здесь будет логика добавления виджета на дашборд
  }
}
