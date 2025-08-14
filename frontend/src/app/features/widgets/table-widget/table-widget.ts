import { Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { GridReadyEvent, RowSelectionOptions } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { TableWidget } from '../../../interfaces/widget-classes';
import { EditableHeaderTable } from '../../editable-header-table/editable-header-table';
import { LucideAngularModule, Table } from 'lucide-angular';

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

  public frameworkComponents = {
    editableHeaderComponent: EditableHeaderTable,
  };

  onGridReady(params: GridReadyEvent) {
    this.widget.gridApi = params.api;
  }
}
