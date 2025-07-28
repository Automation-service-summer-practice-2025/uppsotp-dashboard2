import { Component, Input } from '@angular/core';

@Component({
  selector: 'text-widget',
  standalone: true,
  imports: [],
  templateUrl: './text-widget.html',
  styleUrl: './text-widget.css',
})
export class TextWidget {
  @Input() data!: any;
}
