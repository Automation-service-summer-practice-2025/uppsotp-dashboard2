import { Component, Input } from '@angular/core';
import { ImageWidget } from '../../../interfaces/widget.interface';

@Component({
  selector: 'image-widget',
  imports: [],
  templateUrl: './image-widget.html',
  styleUrl: './image-widget.css',
})
export class ImageWidgetContent {
  @Input() widget!: ImageWidget;
}
