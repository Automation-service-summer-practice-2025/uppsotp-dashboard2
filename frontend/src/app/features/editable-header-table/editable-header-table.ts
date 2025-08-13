import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'app-editable-header-table',
  imports: [FormsModule],
  templateUrl: './editable-header-table.html',
  styleUrl: './editable-header-table.css',
})
export class EditableHeaderTable {
  private params!: IHeaderParams;
  headerName: string = '';

  agInit(params: IHeaderParams): void {
    this.params = params;
    this.headerName = params.displayName;
  }

  onBlur() {
    if (this.headerName.trim()) {
      const newColDefs = this.params.column.getColDef();
      newColDefs.headerName = this.headerName;
      this.params.api.setGridOption('columnDefs', [
        ...this.params.api.getColumnDefs()!,
      ]);
    }
  }
}
