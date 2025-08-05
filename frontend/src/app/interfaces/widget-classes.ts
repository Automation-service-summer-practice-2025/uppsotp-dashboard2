import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { Widget } from './widget.interface';

export class TextWidget extends Widget {
  override type: string = 'text';
  mockParam1: string = 'this is text.mockParam1';
}

export class ImageWidget extends Widget {
  override type: string = 'image';
  mockParam1: string = 'this is image.mockParam1';
}

export class ChartWidget extends Widget {
  override type: string = 'chart';

  chartType: ChartType = 'bar';

  chartData: ChartData = {
    labels: [],
    datasets: [],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: {},
      y: { beginAtZero: true },
    },
  };

  lineColor?: string;
  lineWidth?: number;
  showLegend?: boolean;
  showGrid?: boolean;

  csvRawData?: string;
  csvHeaders?: string[];
  selectedFeature?: string;
  selectedFeatureX?: string;
  selectedFeatureY?: string;

  [key: string]: any;
}
