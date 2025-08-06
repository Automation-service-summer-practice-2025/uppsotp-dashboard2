import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridsterConfig, GridsterModule, GridType } from 'angular-gridster2';
import { Subscription } from 'rxjs';
import { EditSidebarService } from '../../services/edit-sidebar.service';
import { Widget } from '../../interfaces/widget.interface';
import { WidgetRender } from '../widgets/widget-render/widget-render';
import { WidgetService } from '../../services/widget.service';
import { ZoomService } from '../../services/zoom.service';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, GridsterModule, WidgetRender],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  options!: GridsterConfig;
  dashboardWidgets: Widget[] = [];
  baseCellSize = 40;
  zoomSub?: Subscription;
  widgetsSub?: Subscription;

  constructor(
    private editSidebarService: EditSidebarService,
    private widgetService: WidgetService,
    private zoomService: ZoomService
  ) {}

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fixed,

      fixedColWidth: this.baseCellSize,
      fixedRowHeight: this.baseCellSize,
      minItemCols: 2,
      minItemRows: 2,
      maxCols: 54,
      maxRows: 100,
      draggable: {
        enabled: true,
        delayStart: 1000,
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

    this.widgetsSub = this.widgetService.widgets$.subscribe((widgets) => {
      this.dashboardWidgets = widgets;
    });

    this.zoomSub = this.zoomService.zoomLevel$.subscribe((level) => {
      this.updateGridSize(level);
    });
  }

  ngOnDestroy(): void {
    this.zoomSub?.unsubscribe();
    this.widgetsSub?.unsubscribe();
  }

  updateGridSize(zoomLevel: number): void {
    const scaledSize = this.baseCellSize * (zoomLevel / 100);
    this.options.fixedColWidth = scaledSize;
    this.options.fixedRowHeight = scaledSize;
    this.options.api?.resize?.();
    this.options.api?.optionsChanged?.();
  }

  onDoubleClick(widget: Widget) {
    this.editSidebarService.toggleSidebarFor(widget);
  }
}
