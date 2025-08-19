import { Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { TableWidget } from '../../../interfaces/widget-classes';
import { EditableHeaderTable } from '../../editable-header-table/editable-header-table';
import { LucideAngularModule, Table } from 'lucide-angular';
import { CurrentWidgetService } from '../../../services/current-widget.service';
import { Subscription } from 'rxjs';
import { Widget } from '../../../interfaces/widget.interface';

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

  constructor(private currentWidgetService: CurrentWidgetService) {}

  ngOnInit(): void {
    this.dashboardCurrentWidgetSub =
      this.currentWidgetService.currentWidget$.subscribe((widget) => {
        this.dashboardCurrentWidget = widget ?? undefined;
      });
  }

  public frameworkComponents = {
    editableHeaderComponent: EditableHeaderTable,
  };

  onGridReady(params: GridReadyEvent) {
    this.widget.gridApi = params.api;
  }
}
