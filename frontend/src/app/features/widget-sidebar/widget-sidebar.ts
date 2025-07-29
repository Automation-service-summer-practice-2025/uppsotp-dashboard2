import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import {
  widgetSidebarButtons,
  WidgetSideBarButton,
} from './widget-sidebar.config';
import { ZoomService } from '../../services/ZoomService';
import { Observable } from 'rxjs';
import { Zoom } from '../zoom/zoom';

@Component({
  selector: 'widget-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Zoom],
  templateUrl: './widget-sidebar.html',
  styleUrl: './widget-sidebar.css',
})
export class WidgetSidebar {
  buttons: WidgetSideBarButton[] = widgetSidebarButtons;
  zoomLevel$: Observable<number>;

  constructor(private zoomService: ZoomService) {
    this.zoomLevel$ = this.zoomService.zoomLevel$;
  }

  addWidget(type: string) {
    console.log(`Добавление виджета типа: ${type}`);
    // Здесь будет логика добавления виджета на дашборд
  }

  zoomIn() {
    this.zoomService.zoomIn();
  }

  zoomOut() {
    this.zoomService.zoomOut();
  }
}
