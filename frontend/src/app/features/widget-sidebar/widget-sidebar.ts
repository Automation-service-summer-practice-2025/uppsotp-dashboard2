import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { widgetSidebarButtons, WidgetSideBarButton } from './widget-sidebar.config';

@Component({
  selector: 'widget-sidebar',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './widget-sidebar.html',
  styleUrl: './widget-sidebar.css',
})
export class WidgetSidebar {
  buttons: WidgetSideBarButton[] = widgetSidebarButtons;

  addWidget(type: string) {
    console.log(`Добавление виджета типа: ${type}`);
    // Здесь будет логика добавления виджета на дашборд
  }
}
