import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import {
  CompactType,
  GridsterConfig,
  GridsterItem,
  GridsterModule,
  GridType,
} from 'angular-gridster2';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, GridsterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  options!: GridsterConfig;
  dashboardWidgets?: Array<GridsterItem>;
  baseCellSize = 50;

  @Input() set zoomLevel(level: number) {
    if (level) {
      this.updateGridSize(level);
    }
  }

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fixed,

      fixedColWidth: this.baseCellSize,
      fixedRowHeight: this.baseCellSize,
      // maxCols: 12,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
        handles: {
          s: true,
          e: true,
          n: false,
          w: false,
          se: true,
          ne: false,
          sw: false,
          nw: false,
        },
      },
    };

    this.dashboardWidgets = [
      { cols: 1, rows: 1, y: 0, x: 0 },
      { cols: 1, rows: 1, y: 1, x: 1 },
      { cols: 1, rows: 1, y: 2, x: 2 },
    ];
  }

  // Метод для обновления размера ячеек при зуме
  updateGridSize(zoomLevel: number): void {
    if (this.options) {
      const scaledSize = this.baseCellSize * (zoomLevel / 100);
      this.options.fixedColWidth = scaledSize;
      this.options.fixedRowHeight = scaledSize;

      setTimeout(() => {
        this.options.api?.resize?.();
        this.options.api?.optionsChanged?.();
      }, 0);
    }
  }
}
