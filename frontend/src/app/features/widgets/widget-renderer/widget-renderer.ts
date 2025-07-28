import { Component, Input } from '@angular/core';
import { DashboardWidget } from '../widgets.interface';
import { CommonModule } from '@angular/common';
import { TextWidget } from '../text-widget/text-widget';
import { ImageWidget } from '../image-widget/image-widget';

@Component({
  selector: 'widget-renderer',
  imports: [CommonModule, TextWidget, ImageWidget],
  templateUrl: './widget-renderer.html',
  styleUrl: './widget-renderer.css',
})
export class WidgetRenderer {
  @Input({ required: true }) widget!: DashboardWidget;
}
