import { Component, Input } from '@angular/core';
import { Widget } from '../../../interfaces/widget.interface';

@Component({
  selector: 'text-widget',
  imports: [],
  templateUrl: './text-widget.html',
  styleUrl: './text-widget.css',
})
export class TextWidget {
  @Input() widget!: Widget;
}
