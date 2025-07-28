import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterModule, GridType } from 'angular-gridster2';
import { DashboardWidget } from '../widgets/widgets.interface';
import { WidgetsService } from '../widgets/widgets.service';
import { WidgetRenderer } from '../widgets/widget-renderer/widget-renderer';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, GridsterModule, WidgetRenderer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  options: GridsterConfig = {};
  dashboardWidgets: DashboardWidget[] = [];

  constructor(private widgetsService: WidgetsService) {}

  ngOnInit(): void {
    this.initGridsterOptions();

    this.widgetsService.widgets$.subscribe((widgets) => {
      this.dashboardWidgets = widgets;
    });
  }

  initGridsterOptions(): void {
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
  }
}
