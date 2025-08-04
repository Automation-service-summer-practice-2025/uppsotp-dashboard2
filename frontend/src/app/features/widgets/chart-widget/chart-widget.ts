import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartWidget } from '../../../interfaces/widget-classes';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'chart-widget',
  imports: [BaseChartDirective],
  templateUrl: './chart-widget.html',
  styleUrl: './chart-widget.css',
})
export class ChartWidgetComponent implements OnChanges {
  @Input() widget!: ChartWidget;

  chartType: ChartType = 'bar';
  chartData: ChartData = {
    labels: ['A', 'B', 'C'],
    datasets: [{ data: [10, 20, 15], label: 'Серия' }],
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['widget'] && this.widget) {
      this.updateChart();
    }
  }

  updateChart() {
    this.chartType = (this.widget as any).chartType || 'bar';
    this.chartData = (this.widget as any).chartData || {
      labels: [],
      datasets: [],
    };
    this.chartOptions = (this.widget as any).chartOptions || this.chartOptions;
  }
}
