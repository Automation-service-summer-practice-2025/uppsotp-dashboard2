import { Component, Input } from '@angular/core';
import { ChartWidget } from '../../../interfaces/widget-classes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chart-widget-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart-widget-editor.html',
  styleUrl: './chart-widget-editor.css',
})
export class ChartWidgetEditor {
  @Input() widget!: ChartWidget;

  csvData: any[] = [];
  csvHeaders: string[] = [];
  selectedFeature: string = '';

  setChartType(event: Event) {
    const select = event.target as HTMLSelectElement | null;
    if (!select) return;
    this.widget.chartType = select.value as any;
    this.updateChartData();
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = reader.result as string;
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

    this.selectedFeature = '';
  }

  onFeatureSelect(event: Event) {
    const select = event.target as HTMLSelectElement | null;
    if (!select) return;
    this.selectedFeature = select.value;
    this.updateChartData();
  }

  updateChartData() {
    if (this.selectedFeature != '' || this.csvData.length === 0) {
      this.widget.chartData = { labels: [], datasets: [] };
      return;
    }

    if (this.widget.chartType === 'bar') {
      const counts = this.csvData.reduce((acc: any, row: any) => {
        const val = row[this.selectedFeature];
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});

      this.widget.chartData = {
        labels: Object.keys(counts),
        datasets: [
          {
            label: `Распределение по ${this.selectedFeature}`,
            data: Object.values(counts),
            backgroundColor: this.widget.lineColor || 'rgba(75,192,192,0.4)',
            borderColor: this.widget.lineColor || 'rgba(75,192,192,1)',
            borderWidth: this.widget.lineWidth || 1,
          },
        ],
      };
    } else if (this.widget.chartType === 'scatter') {
      this.widget.chartData = {
        datasets: [],
        labels: [],
      };
    }
  }

  onLineColorChange(event: any) {
    this.widget.lineColor = event.target.value;
    this.updateChartData();
  }

  onLineWidthChange(event: any) {
    this.widget.lineWidth = +event.target.value;
    this.updateChartData();
  }

  onShowLegendChange(event: any) {
    this.widget.showLegend = event.target.checked;
    this.updateChartOptions();
  }

  onShowGridChange(event: any) {
    this.widget.showGrid = event.target.checked;
    this.updateChartOptions();
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
