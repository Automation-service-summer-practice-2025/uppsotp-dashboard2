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
  WidgetDTO,
} from './widget-dto.interface';

export class TextWidget extends Widget {
  override type: string = 'Text';
  htmlContent: string = '';
  editor: Editor = new Editor();

  override toDTO(): TextWidgetDTO {
    return {
      Id: this.id,
      Type: this.type,
      PositionX: this.x,
      PositionY: this.y,
      Columns: this.cols,
      Rows: this.rows,
      HtmlContent: this.htmlContent,
    };
  }

  override copyDataFromDTO(dto: TextWidgetDTO): void {
    this.id = dto.Id;
    this.x = dto.PositionX;
    this.y = dto.PositionY;
    this.cols = dto.Columns;
    this.rows = dto.Rows;
    this.htmlContent = dto.HtmlContent;
  }
}

export class ImageWidget extends Widget {
  override type: string = 'Image';

  file?: File | null = null;
  previewUrl?: string | null = null;

  toDTO(): ImageWidgetDTO {
    return {
      Id: this.id,
      Type: this.type,
      PositionX: this.x,
      PositionY: this.y,
      Columns: this.cols,
      Rows: this.rows,
      PreviewUrl: this.previewUrl,
    };
  }

  override copyDataFromDTO(dto: ImageWidgetDTO): void {
    this.id = dto.Id;
    this.x = dto.PositionX;
    this.y = dto.PositionY;
    this.cols = dto.Columns;
    this.rows = dto.Rows;
    this.previewUrl = dto.PreviewUrl;
  }
}

export class ChartWidget extends Widget {
  override type: string = 'Chart';

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
  selectedFeature: Record<string, string> = {
    single: '',
    x: '',
    y: '',
  };

  [key: string]: any;

  toDTO(): ChartWidgetDTO {
    return {
      Id: this.id,
      Type: this.type,
      PositionX: this.x,
      PositionY: this.y,
      Columns: this.cols,
      Rows: this.rows,
      ChartType: this.chartType,
      ChartData: this.chartData,
      ChartOptions: this.chartOptions,
      BackgroundColor: this.backgroundColor,
      BorderWidth: this.borderWidth,
      CategoryPercentage: this.categoryPercentage,
      ShowLegend: this.showLegend,
      ShowGrid: this.showGrid,
      CsvRawData: this.csvRawData,
      CsvHeaders: this.csvHeaders,
    };
  }

  override copyDataFromDTO(dto: ChartWidgetDTO): void {
    this.id = dto.Id;
    this.x = dto.PositionX;
    this.y = dto.PositionY;
    this.cols = dto.Columns;
    this.rows = dto.Rows;
    this.chartType = dto.ChartType;
    this.chartData = dto.ChartData;
    this.chartOptions = dto.ChartOptions;
    this.backgroundColor = dto.BackgroundColor;
    this.borderWidth = dto.BorderWidth;
    this.categoryPercentage = dto.CategoryPercentage;
    this.showLegend = dto.ShowLegend;
    this.showGrid = dto.ShowGrid;
    this.csvRawData = dto.CsvRawData;
    this.csvHeaders = dto.CsvHeaders;
  }
}

export class TableWidget extends Widget {
  override type: string = 'Table';
  columnsTable: ColDef[] = [
    {
      headerName: 'ID',
      field: 'id',
      minWidth: 50,
      maxWidth: 100,
      suppressMovable: true,
      lockPosition: true,
      sortable: true,
    },
  ];
  rowsTable: any[] = [];
  gridApi: GridApi = {} as GridApi;
  currentTheme = themeQuartz.withPart(colorSchemeDarkBlue);

  toDTO(): TableWidgetDTO {
    return {
      Id: this.id,
      Type: this.type,
      PositionX: this.x,
      PositionY: this.y,
      Columns: this.cols,
      Rows: this.rows,
      ColumnsTable: this.columnsTable,
      RowsTable: this.rowsTable,
      GridApi: this.gridApi,
    };
  }

  override copyDataFromDTO(dto: TableWidgetDTO): void {
    this.id = dto.Id;
    this.x = dto.PositionX;
    this.y = dto.PositionY;
    this.cols = dto.Columns;
    this.rows = dto.Rows;
    this.columnsTable = dto.ColumnsTable;
    this.rowsTable = dto.RowsTable;
    this.gridApi = dto.GridApi;
  }
}
