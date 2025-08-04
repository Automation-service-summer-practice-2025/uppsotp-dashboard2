import { Component, Input } from '@angular/core';
import { ChartWidget } from '../../../interfaces/widget-classes';

@Component({
  selector: 'chart-widget-editor',
  standalone: true,
  imports: [],
  templateUrl: './chart-widget-editor.html',
  styleUrl: './chart-widget-editor.css',
})
export class ChartWidgetEditor {
  @Input() widget!: ChartWidget;
}
