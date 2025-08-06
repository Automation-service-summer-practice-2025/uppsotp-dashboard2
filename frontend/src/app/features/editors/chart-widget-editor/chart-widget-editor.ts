import { Component, Input, OnInit } from '@angular/core';
import { ChartWidget } from '../../../interfaces/widget-classes';
import { CommonModule } from '@angular/common';
import {
  chartDataGenerators,
  chartFeatureSelectors,
} from '../../../configs/chart.config';

@Component({
  selector: 'chart-widget-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart-widget-editor.html',
  styleUrl: './chart-widget-editor.css',
})
export class ChartWidgetEditor implements OnInit {
  @Input() widget!: ChartWidget;

  csvData: any[] = [];
  csvHeaders: string[] = [];

  chartFeatureSelectors = chartFeatureSelectors;

  selectedFeatures: Record<string, string> = {
    single: '',
    x: '',
    y: '',
  };

  ngOnInit() {
    if (this.widget.csvRawData) {
      this.parseCSV(this.widget.csvRawData);
    }
    if (this.widget.csvHeaders) {
      this.csvHeaders = this.widget.csvHeaders;
    }

    this.selectedFeatures = { single: '', x: '', y: '' };

    this.updateChartOptions();
    this.updateChartData();
  }

  setChartType(event: Event) {
    const select = event.target as HTMLSelectElement | null;
    if (!select) return;

    this.widget.chartType = select.value as any;

    this.updateChartOptions();
    this.updateChartData();
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      this.widget.csvRawData = text;
      this.parseCSV(text);

      console.log('CSV загружен и распарсен:', this.csvData, this.csvHeaders);

      this.updateChartData();
      this.updateChartOptions();
    };
    reader.readAsText(file);
  }

  parseCSV(csvText: string) {
    const lines = csvText.split(/\r\n|\n/);

    this.csvHeaders = lines[0].split(',');
    this.csvData = lines.slice(1).map((line) => {
      const values = line.split(',');
      const obj: any = {};
      this.csvHeaders.forEach((header, index) => {
        obj[header] = values[index];
      });
      return obj;
    });
    this.widget.csvHeaders = this.csvHeaders;
  }

  onFeatureSelect(key: string, event: Event) {
    const select = event.target as HTMLSelectElement | null;
    if (!select) return;

    this.selectedFeatures[key] = select.value;
    console.log(
      `Выбран признак: key=${key}, value=${select.value}`,
      'selectedFeatures:',
      this.selectedFeatures
    );
    this.updateChartData();
  }

  onParamChange(key: keyof ChartWidget, event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    const booleanKeys = ['showLegend', 'showGrid'];
    const numberKeys = ['lineWidth'];

    const keyStr = key as string;

    if (booleanKeys.includes(keyStr)) {
      this.widget[key] = input.checked as any;
      this.updateChartOptions();
    } else if (numberKeys.includes(keyStr)) {
      this.widget[key] = +input.value as any;
      this.updateChartData();
    } else {
      this.widget[key] = input.value as any;
      this.updateChartData();
    }
  }

  updateChartData() {
    const generator = chartDataGenerators[this.widget.chartType];
    if (generator) {
      generator(this.csvData, this.selectedFeatures, this.widget);
      console.log('Сгенерированы данные графика:', this.widget.chartData);
    } else {
      console.warn(
        'Генератор данных для типа',
        this.widget.chartType,
        'не найден'
      );
    }
    this.widget.chartData = { ...this.widget.chartData };
    this.widget.chartOptions = { ...this.widget.chartOptions };
  }

  updateChartOptions() {
    if (this.widget.chartType === 'bar') {
      this.widget.chartOptions = {
        responsive: true,
        plugins: { legend: { display: this.widget.showLegend ?? true } },
        scales: {
          x: {
            type: 'category',
            grid: { display: this.widget.showGrid ?? true },
          },
          y: {
            beginAtZero: true,
            grid: { display: this.widget.showGrid ?? true },
          },
        },
      };
    } else if (this.widget.chartType === 'scatter') {
      this.widget.chartOptions = {
        responsive: true,
        plugins: { legend: { display: this.widget.showLegend ?? true } },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            grid: { display: this.widget.showGrid ?? true },
          },
          y: {
            type: 'linear',
            grid: { display: this.widget.showGrid ?? true },
          },
        },
      };
    } else {
      this.widget.chartOptions = {
        responsive: true,
        plugins: { legend: { display: this.widget.showLegend ?? true } },
        scales: {
          x: { grid: { display: this.widget.showGrid ?? true } },
          y: { grid: { display: this.widget.showGrid ?? true } },
        },
      };
    }
    console.log('Обновлены опции графика:', this.widget.chartOptions);
    this.widget.chartOptions = { ...this.widget.chartOptions };
  }
}
