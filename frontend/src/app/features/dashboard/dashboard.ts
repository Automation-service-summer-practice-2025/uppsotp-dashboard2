import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fixed,

      fixedColWidth: 50,
      fixedRowHeight: 50,
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
}
