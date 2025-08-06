import { Component, Input } from '@angular/core';
import { TextWidget } from '../../../interfaces/widget-classes';
import { NgxEditorComponent } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'text-widget',
  imports: [NgxEditorComponent, FormsModule, CommonModule],
  templateUrl: './text-widget.html',
  styleUrl: './text-widget.css',
})
export class TextWidgetComponent {
  @Input() widget!: TextWidget;
}
