import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import {
  widgetSidebarButtons,
  WidgetSideBarButton,
} from './widget-sidebar.config';
import { WidgetsService } from '../widgets/widgets.service';

@Component({
  selector: 'widget-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './widget-sidebar.html',
  styleUrl: './widget-sidebar.css',
})
export class WidgetSidebar {
  buttons: WidgetSideBarButton[] = widgetSidebarButtons;

  constructor(private widgetsService: WidgetsService) {}

  addWidget(type: string): void {
    this.widgetsService.addWidget(type);
  }
}
