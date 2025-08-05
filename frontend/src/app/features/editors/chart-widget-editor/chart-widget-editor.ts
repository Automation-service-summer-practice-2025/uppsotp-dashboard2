import { Component, Input, OnInit } from '@angular/core';
import { ChartWidget } from '../../../interfaces/widget-classes';
import { CommonModule } from '@angular/common';
import { chartDataGenerators } from '../../../configs/chart.config';

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

  selectedFeatures: Record<string, string> = {};

  ngOnInit() {
    if (this.widget.csvRawData) {
      this.parseCSV(this.widget.csvRawData);
    }
    if (this.widget.csvHeaders) {
      this.csvHeaders = this.widget.csvHeaders;
    }

    this.selectedFeatures = {
      single: this.widget.selectedFeature || '',
      x: this.widget.selectedFeatureX || '',
      y: this.widget.selectedFeatureY || '',
    };
  }

  setChartType(event: Event) {
    const select = event.target as HTMLSelectElement | null;
    if (!select) return;

    this.widget.chartType = select.value as any;

    this.selectedFeatures = { single: '', x: '', y: '' };
    this.widget.selectedFeature = '';
    this.widget.selectedFeatureX = '';
    this.widget.selectedFeatureY = '';

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
    };
    reader.readAsText(file);
  }

  parseCSV(csvText: string) {
    const lines = csvText.split(/\r\n|\n/);
    if (lines.length === 0) return;

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
    if (key === 'single') this.widget.selectedFeature = select.value;
    if (key === 'x') this.widget.selectedFeatureX = select.value;
    if (key === 'y') this.widget.selectedFeatureY = select.value;
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
    } else {
      this.widget.chartData = { labels: [], datasets: [] };
    }
  }

  updateChartOptions() {
    this.widget.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: this.widget.showLegend ?? true,
        },
      },
      scales: {
        x: {
          grid: {
            display: this.widget.showGrid ?? true,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            display: this.widget.showGrid ?? true,
          },
        },
      },
    };
  }
}
