import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import {
  widgetSidebarButtons,
  WidgetSideBarButton,
} from './widget-sidebar.config';
import { Zoom } from '../zoom/zoom';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'widget-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Zoom],
  templateUrl: './widget-sidebar.html',
  styleUrl: './widget-sidebar.css',
})
export class WidgetSidebar {
  buttons: WidgetSideBarButton[] = widgetSidebarButtons;
  @ViewChild(Dashboard) dashboard!: Dashboard;

  addWidget(type: string) {
    console.log(`Добавление виджета типа: ${type}`);
    // Здесь будет логика добавления виджета на дашборд
  }

  onZoomChange(zoomLevel: number) {
    if (this.dashboard) {
      this.dashboard.updateGridSize(zoomLevel);
    }
  }
}
