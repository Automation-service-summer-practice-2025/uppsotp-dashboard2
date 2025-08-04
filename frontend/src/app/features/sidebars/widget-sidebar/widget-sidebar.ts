import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { WidgetSideBarBtn } from '../../../interfaces/widget-sb-btn.interface';
import { widgetSbBtnsConfig } from '../../../configs/widget-sb-btn.config';
import { Zoom } from '../../zoom/zoom';
import { WidgetService } from '../../../services/widget.service';

@Component({
  selector: 'widget-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Zoom],
  templateUrl: './widget-sidebar.html',
  styleUrl: './widget-sidebar.css',
})
export class WidgetSidebar {
  readonly buttonsConfig: WidgetSideBarBtn[] = widgetSbBtnsConfig;

  constructor(private widgetService: WidgetService) {}

  addWidget(type: string) {
    this.widgetService.addWidget(type);
  }
}
