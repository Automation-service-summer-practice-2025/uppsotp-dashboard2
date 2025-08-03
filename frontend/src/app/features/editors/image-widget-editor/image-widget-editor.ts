import { Component, Input } from '@angular/core';
import { ImageWidget } from '../../../interfaces/widget-classes';

@Component({
  selector: 'image-widget-editor',
  imports: [],
  templateUrl: './image-widget-editor.html',
  styleUrl: './image-widget-editor.css',
})
export class ImageWidgetEditor {
  @Input() widget!: ImageWidget;
}
