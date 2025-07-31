import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Widget } from '../../../interfaces/widget.interface';

@Component({
  selector: 'app-scatter-widget-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scatter-widget-editor.html',
  styleUrl: './scatter-widget-editor.css',
})
export class ScatterWidgetEditor {
  @Input() widget!: Widget;
}
