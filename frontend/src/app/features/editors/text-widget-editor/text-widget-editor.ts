import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextWidget } from '../../../interfaces/widget-classes';

@Component({
  selector: 'text-widget-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './text-widget-editor.html',
  styleUrl: './text-widget-editor.css',
})
export class TextWidgetEditor {
  @Input() widget!: TextWidget;
}
