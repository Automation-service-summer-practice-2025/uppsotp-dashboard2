import { Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { GridReadyEvent } from 'ag-grid-community';
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
  gridOptions = {};

  constructor(
    private currentWidgetService: CurrentWidgetService,
    public viewModeServie: ViewModeService
  ) {}

  ngOnInit(): void {
    this.dashboardCurrentWidgetSub =
      this.currentWidgetService.currentWidget$.subscribe((widget) => {
        this.dashboardCurrentWidget = widget ?? undefined;
      });

    this.gridOptions = {
      suppressCellFocus: this.viewModeServie.isAdminMode,
      singleClickEdit: this.viewModeServie.isAdminMode,
      editType: this.viewModeServie.isAdminMode ? 'fullRow' : false,
      rowSelection: 'single',
    };

    this.updateColumnMovable();
  }

  private updateColumnMovable(): void {
    if (!this.widget.columnsTable) return;

    const disableMove = !this.viewModeServie.isAdminMode;

    this.widget.columnsTable.forEach((col) => {
      col.suppressMovable = disableMove;
    });

    if (this.widget.gridApi) {
      this.widget.gridApi.setGridOption('columnDefs', [
        ...this.widget.columnsTable,
      ]);
    }
  }

  public frameworkComponents = {
    editableHeaderComponent: EditableHeaderTable,
  };

  onGridReady(params: GridReadyEvent) {
    this.widget.gridApi = params.api;
  }
}
