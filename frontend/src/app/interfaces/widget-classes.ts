import { Widget } from './widget.interface';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { Editor } from 'ngx-editor';
import {
  colorSchemeDarkBlue,
  themeQuartz,
  ColDef,
  GridApi,
} from 'ag-grid-community';
import {
  ChartWidgetDTO,
  ImageWidgetDTO,
  TableWidgetDTO,
  TextWidgetDTO,
} from './widget-dto.interface';

export class TextWidget extends Widget {
  override type: string = 'text';
  htmlContent: string = '';
  editor: Editor = new Editor();

  override toDTO(): TextWidgetDTO {
    return {
      id: this.id,
      type: this.type,
      x: this.x,
      y: this.y,
      cols: this.cols,
      rows: this.rows,
      htmlContent: this.htmlContent,
    };
  }
}

export class ImageWidget extends Widget {
  override type: string = 'image';

  file?: File | null = null;
  previewUrl?: string | null = null;

  toDTO(): ImageWidgetDTO {
    return {
      id: this.id,
      type: this.type,
      x: this.x,
      y: this.y,
      cols: this.cols,
      rows: this.rows,
      previewUrl: this.previewUrl,
    };
  }
}

export class ChartWidget extends Widget {
  override type: string = 'chart';

  chartType: ChartType = 'bar';

  chartData: ChartData = { labels: [], datasets: [] };

  chartOptions: ChartOptions = {
    plugins: {
      legend: {
        labels: { color: '#94a3b8' },
      },
      title: {
        font: { size: 20 },
        color: '#94a3b8',
      },
    },
    scales: {
      x: {
        title: { display: true, color: '#94a3b8' },
        grid: { display: true, color: '#4a5a6d' },
        ticks: { color: '#94a3b8' },
        border: {
          color: '#3b82f6',
          width: 2,
        },
      },
      y: {
        grid: { display: true, color: '#4a5a6d' },
        ticks: { color: '#94a3b8' },
        border: {
          color: '#3b82f6',
          width: 2,
        },
      },
    },
  };

  backgroundColor?: string;
  borderWidth?: number;
  categoryPercentage?: number;

  showLegend?: boolean;
  showGrid?: boolean;

  csvRawData?: string;
  csvHeaders?: string[];

  [key: string]: any;

  toDTO(): ChartWidgetDTO {
    return {
      id: this.id,
      type: this.type,
      x: this.x,
      y: this.y,
      cols: this.cols,
      rows: this.rows,
      chartType: this.chartType,
      chartData: this.chartData,
      chartOptions: this.chartOptions,
      backgroundColor: this.backgroundColor,
      borderWidth: this.borderWidth,
      categoryPercentage: this.categoryPercentage,
      showLegend: this.showLegend,
      showGrid: this.showGrid,
      csvRawData: this.csvRawData,
      csvHeaders: this.csvHeaders,
    };
  }
}

export class TableWidget extends Widget {
  override type: string = 'table';
  columnsTable: ColDef[] = [];
  rowsTable: any[] = [];
  gridApi: GridApi = {} as GridApi;
  currentTheme = themeQuartz.withPart(colorSchemeDarkBlue);

  toDTO(): TableWidgetDTO {
    return {
      id: this.id,
      type: this.type,
      x: this.x,
      y: this.y,
      cols: this.cols,
      rows: this.rows,
      columnsTable: this.columnsTable,
      rowsTable: this.rowsTable,
      gridApi: this.gridApi,
    };
  }
}
