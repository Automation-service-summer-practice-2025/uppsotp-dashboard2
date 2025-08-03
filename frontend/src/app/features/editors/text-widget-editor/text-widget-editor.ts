import { Component, Input } from '@angular/core';
import { TextWidget } from '../../../interfaces/widget-classes';

@Component({
  selector: 'text-widget-editor',
  imports: [],
  templateUrl: './text-widget-editor.html',
  styleUrl: './text-widget-editor.css',
})
export class TextWidgetEditor {
  @Input() widget!: TextWidget;
}
