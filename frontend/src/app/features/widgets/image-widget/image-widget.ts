import { Component, Input } from '@angular/core';
import { ImageWidget } from '../../../interfaces/widget-classes';

@Component({
  selector: 'image-widget',
  standalone: true,
  templateUrl: './image-widget.html',
  styleUrl: './image-widget.css',
})
export class ImageWidgetComponent {
  @Input() widget!: ImageWidget;
}
