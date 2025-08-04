import { Component, Input } from '@angular/core';
import { TextWidget } from '../../../interfaces/widget-classes';

@Component({
  selector: 'text-widget',
  imports: [],
  templateUrl: './text-widget.html',
  styleUrl: './text-widget.css',
})
export class TextWidgetComponent {
  @Input() widget!: TextWidget;
}
