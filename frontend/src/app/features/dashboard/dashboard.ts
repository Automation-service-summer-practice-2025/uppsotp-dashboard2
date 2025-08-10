import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
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
  imports: [GridsterModule, WidgetRender],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  zoomSub?: Subscription;
  widgetsSub?: Subscription;
  focusedWidgetSub?: Subscription;

  widgets: Widget[] = [];
  focusedWidget: Widget | undefined = undefined;

  options: GridsterConfig;
  baseCellSize: number = 40;
  wasDraggedOrResized: boolean = false;

  constructor(
    private editSidebarService: EditSidebarService,
    private dashboardElRef: ElementRef,
    private widgetService: WidgetService,
    private zoomService: ZoomService
  ) {
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
        delayStart: 100,
        stop: () => {
          this.wasDraggedOrResized = true;
        },
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
        stop: () => {
          this.wasDraggedOrResized = true;
        },
      },
    };
  }

  ngOnInit(): void {
    document.addEventListener('click', this.onClickOutsideWidget.bind(this));

    this.focusedWidgetSub = this.editSidebarService.currentWidget$.subscribe(
      (widget) => {
        this.focusedWidget = widget ?? undefined;
      }
    );

    this.widgetsSub = this.widgetService.widgets$.subscribe((widgets) => {
      this.widgets = widgets;
    });

    this.zoomSub = this.zoomService.zoomLevel$.subscribe((level) => {
      this.updateGridSize(level);
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.onClickOutsideWidget.bind(this));
    this.zoomSub?.unsubscribe();
    this.widgetsSub?.unsubscribe();
    this.focusedWidgetSub?.unsubscribe();
  }

  updateGridSize(zoomLevel: number): void {
    const scaledSize = this.baseCellSize * (zoomLevel / 100);
    this.options.fixedColWidth = scaledSize;
    this.options.fixedRowHeight = scaledSize;
    this.options.api?.resize?.();
    this.options.api?.optionsChanged?.();
  }

  onWidgetClick(widget: Widget): void {
    if (this.wasDraggedOrResized) {
      this.wasDraggedOrResized = false;
      return;
    }
    this.editSidebarService.openEditSidebar(widget);
  }

  onClickOutsideWidget(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const clickedInsideDashboard =
      this.dashboardElRef.nativeElement.contains(target);
    const clickedOnWidget = target.closest('gridster-item') !== null;

    if (clickedInsideDashboard && !clickedOnWidget) {
      this.editSidebarService.closeEditSidebar();
    }
  }
}
