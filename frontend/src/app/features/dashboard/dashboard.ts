import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  GridsterConfig,
  GridsterItem,
  GridsterModule,
  GridType,
} from 'angular-gridster2';
import { WidgetToolbar } from '../widget-toolbar/widget-toolbar';
import { ZoomService } from '../../services/ZoomService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, GridsterModule, WidgetToolbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  options!: GridsterConfig;
  dashboardWidgets?: Array<GridsterItem>;
  baseCellSize = 50;
  zoomSub?: Subscription;

  constructor(private zoomService: ZoomService) {}

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fixed,

      fixedColWidth: this.baseCellSize,
      fixedRowHeight: this.baseCellSize,
      // maxCols: 12,
      draggable: {
        enabled: true,
        ignoreContent: true,
        dragHandleClass: 'drag-handle',
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
      { cols: 2, rows: 2, y: 1, x: 1 },
      { cols: 3, rows: 3, y: 2, x: 2 },
    ];

    this.zoomSub = this.zoomService.zoomLevel$.subscribe((level) => {
      this.updateGridSize(level);
    });
  }

  ngOnDestroy(): void {
    this.zoomSub?.unsubscribe();
  }

  // Метод для обновления размера ячеек при зуме
  updateGridSize(zoomLevel: number): void {
    const scaledSize = this.baseCellSize * (zoomLevel / 100);
    this.options.fixedColWidth = scaledSize;
    this.options.fixedRowHeight = scaledSize;

    this.options.api?.resize?.();
    this.options.api?.optionsChanged?.();
  }
}
