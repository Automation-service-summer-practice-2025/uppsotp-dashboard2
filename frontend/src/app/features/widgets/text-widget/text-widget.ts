import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { TextWidget } from '../../../interfaces/widget-classes';
import { NgxEditorComponent } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Text, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'text-widget',
  imports: [NgxEditorComponent, FormsModule, CommonModule, LucideAngularModule],
  templateUrl: './text-widget.html',
  styleUrl: './text-widget.css',
})
export class TextWidgetComponent {
  @Input() widget!: TextWidget;

  textIcon = Text;
  isClicked = false;

  constructor(private cdr: ChangeDetectorRef) {}

  onClick() {
    this.isClicked = true;
    this.cdr.detectChanges();
  }
}
