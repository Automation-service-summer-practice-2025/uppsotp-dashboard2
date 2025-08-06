import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ChartWidget } from '../../../interfaces/widget-classes';
import { Chart } from 'chart.js';

import {
  BarController,
  BarElement,
  LineController,
  PointElement,
  ScatterController,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Title,
} from 'chart.js';

// Регистрируем компоненты Chart.js один раз
Chart.register(
  BarController,
  BarElement,
  LineController,
  PointElement,
  ScatterController,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Title
);

@Component({
  selector: 'chart-widget',
  templateUrl: './chart-widget.html',
  styleUrls: ['./chart-widget.css'],
})
export class ChartWidgetComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  @Input() widget!: ChartWidget;

  @ViewChild('canvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['widget'] && this.widget && this.canvasRef) {
      this.updateChartInstance();
    }
  }

  private renderChart() {
    if (!this.widget) return;
    if (!this.canvasRef) {
      console.warn('Canvas элемент ещё не готов');
      return;
    }
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('2D context not found for chart rendering');
      return;
    }
    if (this.chart) {
      this.chart.destroy();
    }
    console.log('Создание нового чарта с данными:', this.widget.chartData);
    this.chart = new Chart(ctx, {
      type: this.widget.chartType,
      data: this.widget.chartData,
      options: this.widget.chartOptions,
    });
  }

  private updateChartInstance() {
    if (!this.chart) {
      console.warn('Чарт ещё не создан');
      return;
    }
    console.log('Обновление чарта с новыми данными', this.widget.chartData);
    this.chart.destroy();
    this.renderChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
