import { Widget } from './widget.interface';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { Editor } from 'ngx-editor';
import { Type, Image, ChartLine } from 'lucide-angular';

export class TextWidget extends Widget {
  override type: string = 'text';
  htmlContent: string = '';
  editor: Editor = new Editor();
  defaultIcon = Type;

  override isNull(): boolean {
    return !this.htmlContent || this.htmlContent.trim() === '';
  }
}

export class ImageWidget extends Widget {
  override type: string = 'image';

  file?: File | null = null;
  previewUrl?: string | null = null;
  defaultIcon = Image;

  override isNull(): boolean {
    return !this.previewUrl;
  }
}

export class ChartWidget extends Widget {
  override type: string = 'chart';

  defaultIcon = ChartLine;

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

  override isNull(): boolean {
    return !this.chartData.labels?.length || !this.chartData.datasets?.length;
  }
}
