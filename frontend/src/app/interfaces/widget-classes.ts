import { Widget } from './widget.interface';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { Editor } from 'ngx-editor';

export class TextWidget extends Widget {
  override type: string = 'text';
  htmlContent: string = '';
  editor: Editor = new Editor();
}

export class ImageWidget extends Widget {
  override type: string = 'image';

  file?: File | null = null;
  previewUrl?: string | null = null;
}

export class ChartWidget extends Widget {
  override type: string = 'chart';

  chartType: ChartType = 'bar';

  chartData: ChartData = { labels: [], datasets: [] };

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
        labels: { color: '#94a3b8' },
      },
      title: {
        display: true,
        text: 'График',
        font: { size: 20 },
        color: '#94a3b8',
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#0f172a',
        titleColor: '#a2b8d7ff',
        bodyColor: '#94a3b8',
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Ось X', color: '#94a3b8' },
        grid: { display: true, color: '#4a5a6d' },
        ticks: { color: '#94a3b8' },
        border: {
          color: '#3b82f6',
          width: 2,
        },
      },
      y: {
        beginAtZero: true,
        stacked: true,
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
  borderColor?: string;
  borderWidth?: number;
  categoryPercentage?: number;

  showLegend?: boolean;
  showGrid?: boolean;

  csvRawData?: string;
  csvHeaders?: string[];

  [key: string]: any;
}
