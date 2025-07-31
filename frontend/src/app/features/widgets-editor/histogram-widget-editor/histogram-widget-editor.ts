import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Widget } from '../../../interfaces/widget.interface';

@Component({
  selector: 'app-histogram-widget-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './histogram-widget-editor.html',
  styleUrl: './histogram-widget-editor.css',
})
export class HistogramWidgetEditor {
  @Input() widget!: Widget;
}
