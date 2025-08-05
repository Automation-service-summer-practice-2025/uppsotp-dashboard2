import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { ImageWidget } from '../../../interfaces/widget-classes';

@Component({
  selector: 'image-widget-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-widget-editor.html',
  styleUrl: './image-widget-editor.css',
})
export class ImageWidgetEditor {
  @Input() widget!: ImageWidget;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.onFileInsert(file);
    }
  }

  @HostListener('document:paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          this.onFileInsert(file);
          break;
        }
      }
    }
  }

  onFileInsert(file: File) {
    this.widget.file = file;
    this.widget.previewUrl = URL.createObjectURL(file);
  }

  get imageUploadLabel(): string {
    return this.widget.file ? 'Заменить изображение' : 'Загрузить изображение';
  }
}
