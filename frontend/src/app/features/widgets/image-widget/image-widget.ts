import { Component, Input } from '@angular/core';
import { Widget } from '../../../interfaces/widget.interface';

@Component({
  selector: 'image-widget',
  imports: [],
  templateUrl: './image-widget.html',
  styleUrl: './image-widget.css',
})
export class ImageWidget {
  @Input() widget!: Widget;
}
