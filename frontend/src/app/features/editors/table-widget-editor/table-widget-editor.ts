import { Component, HostListener, Input } from '@angular/core';
import { TableWidget } from '../../../interfaces/widget-classes';
import { ColDef } from 'ag-grid-community';
import { LucideAngularModule } from 'lucide-angular';
import { getTableEditorButtons } from '../../../configs/table-editor-btn.config';
import { availableThemes } from '../../../configs/table-availablethemes.config';
import * as Papa from 'papaparse';

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
      filter: true,
      sortable: true,
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
    if (this.widget.columnsTable.length <= 1) {
      return;
    }
    this.widget.columnsTable.pop();
    this.widget.gridApi.setGridOption('columnDefs', [
      ...this.widget.columnsTable,
    ]);
    if (this.widget.columnsTable.length === 1) {
      this.widget.rowsTable = [];
      this.widget.gridApi.setGridOption('rowData', []);
      return;
    }
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
    if (!this.widget.rowsTable.length) {
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

  onCsvFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (file && file.type.endsWith('csv')) {
      this.processCsvFile(file);
    }
  }

  private processCsvFile(file: File): void {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        this.handleCsvResults(results);
      },
      error: (error) => {
        console.error('Ошибка парсинга CSV:', error);
        alert('Ошибка при обработке CSV файла');
      },
    });
  }

  @HostListener('document:paste', ['$event'])
  handlePaste(event: ClipboardEvent): void {
    const items = event.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      console.log(item);
      if (item.type.endsWith('csv')) {
        const file = item.getAsFile();
        if (file) {
          this.processCsvFile(file);
        }
      }
    }
  }

  private handleCsvResults(results: Papa.ParseResult<any>): void {
    this.nextRowId = 1;
    this.widget.rowsTable = results.data.map((row, index) => ({
      ...row,
      id: `${this.nextRowId + index}`,
    }));
    this.nextRowId += results.data.length;
    console.log(this.widget.rowsTable);
    this.createColumnDefs(results.meta.fields || Object.keys(results.data[0]));
    this.updateGrid();
  }

  private createColumnDefs(fields: string[]): void {
    const idColumn = this.widget.columnsTable.find(
      (col) => col.field === 'id'
    ) || {
      headerName: 'ID',
      field: 'id',
      minWidth: 50,
      resizable: false,
      suppressSizeToFit: true,
      suppressMovable: true,
      lockPosition: true,
      sortable: false,
    };
    const csvColumns = fields
      .filter((field) => field !== 'id')
      .map((field) => ({
        headerName: field,
        field: field,
        editable: true,
        headerComponent: 'editableHeaderComponent',
        filter: true,
        sortable: true,
      }));

    this.widget.columnsTable = [idColumn, ...csvColumns];
  }

  private updateGrid(): void {
    this.widget.gridApi.setGridOption('columnDefs', this.widget.columnsTable);
    this.widget.gridApi.setGridOption('rowData', this.widget.rowsTable);
    this.widget.gridApi.autoSizeAllColumns();
  }
}
