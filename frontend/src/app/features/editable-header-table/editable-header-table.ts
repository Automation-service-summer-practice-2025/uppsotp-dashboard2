import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IHeaderParams } from 'ag-grid-community';
import { CustomHeaderParams } from '../../interfaces/table-custom-header.interface';

@Component({
  selector: 'editable-header-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editable-header-table.html',
  styleUrl: './editable-header-table.css',
})
export class EditableHeaderTable {
  private params!: CustomHeaderParams;
  headerName: string = '';

  agInit(params: IHeaderParams): void {
    this.params = params;
    this.headerName = params.displayName;
  }

  onBlur() {
    if (this.headerName.trim() && this.params) {
      const currentColumnField = this.params.column.getColDef().field;
      if (currentColumnField) {
        const colDef = this.params.column.getColDef();
        colDef.headerName = this.headerName;
        this.params.api.refreshHeader();
        if (this.params.widget && this.params.widget.columnsTable) {
          const widgetColumn = this.params.widget.columnsTable.find(
            (col: any) => col.field === currentColumnField
          );
          if (widgetColumn) {
            widgetColumn.headerName = this.headerName;
          }
        }
      }
    }
  }
}
