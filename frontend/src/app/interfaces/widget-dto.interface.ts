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
  type: 'text';
  htmlContent: string;
  // editor объект исключен, так как не сериализуется
}

export interface ImageWidgetDTO extends WidgetDTO {
  type: 'image';
  previewUrl?: string | null;
}

export interface ChartWidgetDTO extends WidgetDTO {
  type: 'chart';
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
  [key: string]: any;
}
