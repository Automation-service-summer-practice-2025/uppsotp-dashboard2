import { ChartOptions } from 'chart.js';
import { ChartWidget } from '../interfaces/widget-classes';

export const chartDataGenerators: Record<
  string,
  (
    csvData: any[],
    selectedFeatures: Record<string, string>,
    widget: ChartWidget
  ) => void
> = {
  bar: (csvData, selectedFeatures, widget) => {
    if (!selectedFeatures['single'] || !csvData.length) {
      widget.chartData = { labels: [], datasets: [] };
      return;
    }
    const counts: Record<string, number> = {};
    for (const row of csvData) {
      const val = row[selectedFeatures['single']];
      if (val != null) {
        counts[val] = (counts[val] || 0) + 1;
      }
    }
    widget.chartData = {
      labels: Object.keys(counts),
      datasets: [
        {
          label: `Распределение по ${selectedFeatures['single']}`,
          data: Object.values(counts),
          backgroundColor: widget.backgroundColor,
          borderColor: widget.borderColor,
          borderWidth: widget.borderWidth,
          categoryPercentage: widget.categoryPercentage,
        },
      ],
    };
  },
  scatter: (csvData, selectedFeatures, widget) => {
    const x = selectedFeatures['x'];
    const y = selectedFeatures['y'];
    if (!x || !y || !csvData.length) {
      widget.chartData = { datasets: [], labels: [] };
      return;
    }
    const dataPoints = csvData.map((row) => ({
      x: Number(row[x]),
      y: Number(row[y]),
    }));
    widget.chartData = {
      datasets: [
        {
          label: `Scatter: ${x} vs ${y}`,
          data: dataPoints,
          backgroundColor: widget.backgroundColor,
          borderColor: widget.borderColor,
          borderWidth: widget.borderWidth,
          showLine: false,
          pointRadius: 5,
          type: 'scatter',
        },
      ],
    };
  },
};

export const chartOptionsGenerators: Record<
  string,
  (widget: ChartWidget) => ChartOptions
> = {
  bar: (widget) => ({
    responsive: true,
    plugins: {
      legend: {
        display: widget.showLegend ?? true,
        labels: { color: '#94a3b8' },
      },
    },
    scales: {
      x: {
        type: 'category',
        grid: { display: widget.showGrid ?? true, color: '#4a5a6d' },
        ticks: { color: '#94a3b8' },
        border: { color: '#3b82f6', width: 2 },
        title: { display: true, color: '#94a3b8', text: 'Ось X' },
      },
      y: {
        beginAtZero: true,
        grid: { display: widget.showGrid ?? true, color: '#4a5a6d' },
        ticks: { color: '#94a3b8' },
        border: { color: '#3b82f6', width: 2 },
      },
    },
  }),

  scatter: (widget) => ({
    responsive: true,
    plugins: {
      legend: {
        display: widget.showLegend ?? true,
        labels: { color: '#94a3b8' },
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        grid: { display: widget.showGrid ?? true, color: '#4a5a6d' },
        ticks: { color: '#94a3b8' },
        border: { color: '#3b82f6', width: 2 },
      },
      y: {
        type: 'linear',
        grid: { display: widget.showGrid ?? true, color: '#4a5a6d' },
        ticks: { color: '#94a3b8' },
        border: { color: '#3b82f6', width: 2 },
      },
    },
  }),
};

export const chartFeatureSelectors: Record<
  string,
  { key: string; label: string }[]
> = {
  bar: [{ key: 'single', label: 'Выберите признак' }],
  scatter: [
    { key: 'x', label: 'Выберите X-признак' },
    { key: 'y', label: 'Выберите Y-признак' },
  ],
};
