import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Widget } from '../../../interfaces/widget.interface';

@Component({
  selector: 'app-text-widget-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-widget-editor.html',
  styleUrl: './text-widget-editor.css',
})
export class TextWidgetEditor {
  @Input() widget!: Widget;
}
