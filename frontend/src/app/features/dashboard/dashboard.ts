import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  CompactType,
  GridsterConfig,
  GridsterItem,
  GridsterModule,
  GridType,
} from 'angular-gridster2';
import { DashboardItemPanel } from '../dashboard-item-panel/dashboard-item-panel';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, GridsterModule, DashboardItemPanel],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  options!: GridsterConfig;
  dashboardWidgets?: Array<GridsterItem>;

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fixed,

      fixedColWidth: 50,
      fixedRowHeight: 50,
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
  }
}
