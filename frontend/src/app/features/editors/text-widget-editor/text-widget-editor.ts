import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextWidget } from '../../../interfaces/widget-classes';
import { NgxEditorMenuComponent, Toolbar } from 'ngx-editor';

@Component({
  selector: 'text-widget-editor',
  standalone: true,
  imports: [FormsModule, NgxEditorMenuComponent],
  templateUrl: './text-widget-editor.html',
  styleUrl: './text-widget-editor.css',
})
export class TextWidgetEditor {
  @Input() widget!: TextWidget;

  toolbar: Toolbar = [
    [
      'undo',
      'redo',
      'bold',
      'italic',
      'underline',
      'strike',
      'indent',
      'outdent',
      'code',
      'blockquote',
      'ordered_list',
      'bullet_list',
      { heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
      'text_color',
      'background_color',
      'align_left',
      'align_center',
      'align_right',
      'align_justify',
      'horizontal_rule',
      'format_clear',
      'superscript',
      'subscript',
    ],
  ];
}
