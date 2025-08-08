import { Component, Input } from '@angular/core';
import { ImageWidget } from '../../../interfaces/widget-classes';
import { Image, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'image-widget',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './image-widget.html',
  styleUrl: './image-widget.css',
})
export class ImageWidgetComponent {
  @Input() widget!: ImageWidget;

  readonly iconImage = Image;
}
