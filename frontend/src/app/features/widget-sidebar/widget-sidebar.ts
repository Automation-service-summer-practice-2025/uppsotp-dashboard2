import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import {
  widgetSidebarButtons,
  WidgetSideBarButton,
} from './widget-sidebar.config';
import { Zoom } from '../zoom/zoom';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'widget-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Zoom],
  templateUrl: './widget-sidebar.html',
  styleUrl: './widget-sidebar.css',
})
export class WidgetSidebar {
  buttons: WidgetSideBarButton[] = widgetSidebarButtons;
  @Output() zoomChange = new EventEmitter<number>();

  addWidget(type: string) {
    console.log(`Добавление виджета типа: ${type}`);
    // Здесь будет логика добавления виджета на дашборд
  }

  onZoomChange(level: number) {
    this.zoomChange.emit(level);
  }
}
