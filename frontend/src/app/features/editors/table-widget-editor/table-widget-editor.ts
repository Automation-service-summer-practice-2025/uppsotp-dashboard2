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

  private nextColId!: number;
  private nextRowId!: number;

  readonly availableThemes = availableThemes;

  ngOnInit() {
    this.initializeCounters();
  }

  private initializeCounters() {
    // Находим максимальный ID колонки
    let maxColId = 0;
    this.widget.columnsTable.forEach((col) => {
      if (col.field && col.field.startsWith('col')) {
        const id = parseInt(col.field.replace('col', ''));
        if (!isNaN(id) && id > maxColId) {
          maxColId = id;
        }
      }
    });
    this.nextColId = maxColId + 1;

    // Находим максимальный ID строки
    let maxRowId = 0;
    this.widget.rowsTable.forEach((row) => {
      if (row.id) {
        const id = parseInt(row.id);
        if (!isNaN(id) && id > maxRowId) {
          maxRowId = id;
        }
      }
    });
    this.nextRowId = maxRowId + 1;
  }

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
    if (this.widget.rowsTable.length === 0) {
      this.addRow();
    }
  }

  removeColumn() {
    if (
      !this.widget ||
      !this.widget.columnsTable ||
      this.widget.columnsTable.length <= 1
    ) {
      return;
    }
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
    if (this.widget.columnsTable.length === 1) {
      this.addColumn();
    }
  }

  removeRow() {
    if (
      !this.widget ||
      !this.widget.rowsTable ||
      !this.widget.rowsTable.length
    ) {
      return;
    }
    const selectedRows = this.widget.gridApi.getSelectedRows();
    if (selectedRows.length > 0) {
      this.widget.gridApi.applyTransaction({ remove: selectedRows });
      selectedRows.forEach((selectedRow) => {
        const index = this.widget.rowsTable.findIndex(
          (row) => row.id === selectedRow.id
        );
        if (index !== -1) {
          this.widget.rowsTable.splice(index, 1);
        }
      });
    }
  }
}
