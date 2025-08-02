import { Component, Input } from '@angular/core';
import { Widget } from '../../../interfaces/widget.interface';

@Component({
  selector: 'widget-render',
  imports: [],
  templateUrl: './widget-render.html',
  styleUrl: './widget-render.css',
})
export class WidgetRender {
  @Input() widget!: Widget;
}
