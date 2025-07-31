import { Component, Input } from '@angular/core';
import { Widget } from '../../../interfaces/widget.interface';

@Component({
  selector: 'text-widget-editor',
  standalone: true,
  imports: [],
  templateUrl: './text-widget-editor.html',
  styleUrl: './text-widget-editor.css',
})
export class TextWidgetEditor {
  @Input() widget!: Widget;
}
