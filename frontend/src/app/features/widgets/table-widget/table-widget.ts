import { Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { GridOptions, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { TableWidget } from '../../../interfaces/widget-classes';
import { LucideAngularModule, Table } from 'lucide-angular';
import { CurrentWidgetService } from '../../../services/current-widget.service';
import { Subscription } from 'rxjs';
import { Widget } from '../../../interfaces/widget.interface';
import { EditableHeaderTable } from './editable-header-table/editable-header-table';
import { ViewModeService } from '../../../services/view-mode.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'table-widget',
  standalone: true,
  imports: [AgGridAngular, LucideAngularModule],
  templateUrl: './table-widget.html',
  styleUrl: './table-widget.css',
})
export class TableWidgetComponent {
  @Input() widget!: TableWidget;

  readonly iconTable = Table;
  dashboardCurrentWidgetSub?: Subscription;
  dashboardCurrentWidget: Widget | undefined = undefined;

  constructor(
    private currentWidgetService: CurrentWidgetService,
    public viewModeServie: ViewModeService
  ) {}

  ngOnInit(): void {
    this.dashboardCurrentWidgetSub =
      this.currentWidgetService.currentWidget$.subscribe((widget) => {
        this.dashboardCurrentWidget = widget ?? undefined;
      });

    this.updateColumnProperty();
  }

  get gridOptions(): GridOptions {
    return {
      rowSelection: 'single',
      enterNavigatesVertically: true,
      enterNavigatesVerticallyAfterEdit: true,
      stopEditingWhenCellsLoseFocus: true,
      rowDragManaged: this.viewModeServie.isAdminMode,
      rowDragEntireRow: this.viewModeServie.isAdminMode,
    };
  }

  private updateColumnProperty(): void {
    if (!this.widget.columnsTable) return;

    this.widget.columnsTable.forEach((col) => {
      col.suppressMovable = !this.viewModeServie.isAdminMode;
      col.editable = this.viewModeServie.isAdminMode;
    });
  }

  public frameworkComponents = {
    editableHeaderComponent: EditableHeaderTable,
  };

  onGridReady(params: GridReadyEvent) {
    this.widget.gridApi = params.api;
  }
}
