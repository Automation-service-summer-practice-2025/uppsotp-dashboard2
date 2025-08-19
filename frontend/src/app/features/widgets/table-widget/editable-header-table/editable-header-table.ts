import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IHeaderParams } from 'ag-grid-community';
import { CustomHeaderParams } from '../../../../interfaces/table-custom-header.interface';
import { Subscription } from 'rxjs';
import { Widget } from '../../../../interfaces/widget.interface';
import { CurrentWidgetService } from '../../../../services/current-widget.service';
import { TableWidget } from '../../../../interfaces/widget-classes';

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
  dashboardCurrentWidgetSub?: Subscription;
  dashboardCurrentWidget: TableWidget | undefined = undefined;

  constructor(private currentWidgetService: CurrentWidgetService) {}

  ngOnInit(): void {
    this.dashboardCurrentWidgetSub =
      this.currentWidgetService.currentWidget$.subscribe((widget) => {
        this.dashboardCurrentWidget = (widget as TableWidget) ?? undefined;
      });
  }
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
        if (
          this.dashboardCurrentWidget &&
          this.dashboardCurrentWidget.columnsTable
        ) {
          const widgetColumn = this.dashboardCurrentWidget.columnsTable.find(
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
