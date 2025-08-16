import { ChartData, ChartOptions, ChartType } from 'chart.js';

export interface WidgetDTO {
  id: string;
  type: string;
  x: number;
  y: number;
  cols: number;
  rows: number;
  data: Record<string, any>;
}

export interface TextWidgetDTO extends WidgetDTO {
  data: {
    htmlContent: string;
  };
}

export interface ImageWidgetDTO extends WidgetDTO {
  data: {
    previewUrl?: string | null;
  };
}

export interface ChartWidgetDTO extends WidgetDTO {
  data: {
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
  };
}
