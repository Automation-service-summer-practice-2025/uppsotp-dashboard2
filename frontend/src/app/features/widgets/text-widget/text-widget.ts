import { Component, Input } from '@angular/core';
import { TextWidget } from '../../../interfaces/widget.interface';

@Component({
  selector: 'text-widget',
  imports: [],
  templateUrl: './text-widget.html',
  styleUrl: './text-widget.css',
})
export class TextWidgetContent {
  @Input() widget!: TextWidget;
}
