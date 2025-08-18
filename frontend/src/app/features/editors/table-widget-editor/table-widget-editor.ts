import { Component, Input } from '@angular/core';
import { TableWidget } from '../../../interfaces/widget-classes';
import { ColDef } from 'ag-grid-community';
import { LucideAngularModule } from 'lucide-angular';
import { getTableEditorButtons } from '../../../configs/table-editor-btn.config';
import { availableThemes } from '../../../configs/table-availablethemes.config';

@Component({
  selector: 'table-widget-editor',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './table-widget-editor.html',
  styleUrl: './table-widget-editor.css',
})
export class TableWidgetEditor {
  @Input() widget!: TableWidget;

  private nextColId = 1;
  private nextRowId = 1;

  readonly availableThemes = availableThemes;

  get buttons() {
    return getTableEditorButtons({
      addColumn: () => this.addColumn(),
      removeColumn: () => this.removeColumn(),
      addRow: () => this.addRow(),
      removeRow: () => this.removeRow(),
    });
  }

  changeTheme(theme: any): void {
    this.widget.currentTheme = theme;
    this.widget.gridApi.refreshHeader();
    this.widget.gridApi.redrawRows();
  }

  addColumn() {
    const newColId = `col${this.nextColId++}`;
    const newColumn: ColDef = {
      headerName: `Колонка ${newColId}`,
      field: newColId,
      editable: true,
      headerComponent: 'editableHeaderComponent',
    };
    this.widget.columnsTable.push(newColumn);
    this.widget.gridApi.setGridOption('columnDefs', [
      ...this.widget.columnsTable,
    ]);
  }

  removeColumn() {
    this.widget.columnsTable.pop();
    this.widget.gridApi.setGridOption('columnDefs', [
      ...this.widget.columnsTable,
    ]);
  }

  addRow() {
    const newRow: any = { id: `${this.nextRowId++}` };
    this.widget.columnsTable.forEach((col) => {
      if (col.field !== 'id') {
        newRow[col.field!] = '';
      }
    });
    this.widget.rowsTable.push(newRow);
    this.widget.gridApi.applyTransaction({ add: [newRow] });
  }

  removeRow() {
    const selectedRows = this.widget.gridApi.getSelectedRows();
    if (selectedRows.length > 0) {
      this.widget.gridApi.applyTransaction({ remove: selectedRows });
    }
  }
}
