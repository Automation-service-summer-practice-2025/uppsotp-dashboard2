import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Widget } from '../../../interfaces/widget.interface';

@Component({
  selector: 'app-image-widget-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-widget-editor.html',
  styleUrl: './image-widget-editor.css',
})
export class ImageWidgetEditor {
  @Input() widget!: Widget;
}
