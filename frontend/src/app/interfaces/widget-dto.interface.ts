import { ChartData, ChartOptions, ChartType } from 'chart.js';

export interface WidgetDTO {
  id: string;
  type: string;
  x: number;
  y: number;
  cols: number;
  rows: number;
}

export interface TextWidgetDTO extends WidgetDTO {
  htmlContent: string;
}

export interface ImageWidgetDTO extends WidgetDTO {
  previewUrl?: string | null;
}

export interface ChartWidgetDTO extends WidgetDTO {
  chartType: ChartType;
  chartData: ChartData;
  chartOptions: ChartOptions;
  backgroundColor?: string;
  borderWidth?: number;
  categoryPercentage?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  csvRawData?: string;
  csvHeaders?: string[];
}
