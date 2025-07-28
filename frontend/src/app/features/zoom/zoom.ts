import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { GridsterConfig } from 'angular-gridster2';
import { LucideAngularModule, CirclePlus, CircleMinus } from 'lucide-angular';

@Component({
  selector: 'zoom',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './zoom.html',
  styleUrl: './zoom.css',
})
export class Zoom {
  @Input() options!: GridsterConfig;
  @Output() zoomChange = new EventEmitter<number>();
  zoomLevel: number = 100;
  minZoom: number = 50;
  maxZoom: number = 200;
  zoomStep: number = 10;

  zoomIncreaseIcon = CirclePlus;
  zoomDecreaseIcon = CircleMinus;

  zoomIn(): void {
    this.zoomLevel = Math.min(this.zoomLevel + this.zoomStep, this.maxZoom);
    this.updateZoom();
  }

  zoomOut(): void {
    this.zoomLevel = Math.max(this.zoomLevel - this.zoomStep, this.minZoom);
    this.updateZoom();
  }

  resetZoom(): void {
    this.zoomLevel = 100;
    this.updateZoom();
  }

  public updateZoom(): void {
    const zoomValue = this.zoomLevel / 100;
    document.documentElement.style.setProperty(
      '--zoom-level',
      zoomValue.toString()
    );
    this.zoomChange.emit(this.zoomLevel);

    if (this.options) {
      const scaledSize = 50 * zoomValue;
      this.options.fixedColWidth = scaledSize;
      this.options.fixedRowHeight = scaledSize;

      setTimeout(() => {
        this.options.api?.resize?.();
        this.options.api?.optionsChanged?.();
      }, 100);
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === '+') {
      this.zoomIn();
      event.preventDefault();
    }
    if (event.ctrlKey && event.key === '-') {
      this.zoomOut();
      event.preventDefault();
    }
  }
}
