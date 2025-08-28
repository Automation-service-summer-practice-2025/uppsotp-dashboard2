import { ColDef, GridApi } from 'ag-grid-community';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

export interface WidgetDTO {
  Id: string;
  Type: string;
  PositionX: number;
  PositionY: number;
  Columns: number;
  Rows: number;
}

export interface TextWidgetDTO extends WidgetDTO {
  HtmlContent: string;
}

export interface ImageWidgetDTO extends WidgetDTO {
  PreviewUrl?: string | null;
}

export interface ChartWidgetDTO extends WidgetDTO {
  ChartType: ChartType;
  ChartData: ChartData;
  ChartOptions: ChartOptions;
  BackgroundColor?: string;
  BorderWidth?: number;
  CategoryPercentage?: number;
  ShowLegend?: boolean;
  ShowGrid?: boolean;
  CsvRawData?: string;
  CsvHeaders?: string[];
}

export interface TableWidgetDTO extends WidgetDTO {
  ColumnsTable: ColDef[];
  RowsTable: any[];
  GridApi: GridApi;
}
