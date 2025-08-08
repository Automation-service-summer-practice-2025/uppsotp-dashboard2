import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { Widget } from './widget.interface';

export class TextWidget extends Widget {
  override type: string = 'text';
  mockParam1: string = 'this is text.mockParam1';
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
        title: { display: true, text: 'Ось X' },
        grid: { display: false },
        ticks: { color: '#94a3b8' },
        min: 0,
        max: 200,
      },
      y: { beginAtZero: true, stacked: true },
    },
  };

  //Настройка данных. Пойдут в chartData
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  categoryPercentage?: number; //[0;1]
  barPercentage?: number; //[0;1]
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  hoverBorderWidth?: number;
  indexAxis?: 'x' | 'y';
  showLegend?: boolean;
  showGrid?: boolean;

  csvRawData?: string;
  csvHeaders?: string[];

  [key: string]: any;
}
