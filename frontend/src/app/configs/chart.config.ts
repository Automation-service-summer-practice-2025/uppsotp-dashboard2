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
          backgroundColor: widget.lineColor || 'rgba(75,192,192,0.4)',
          borderColor: widget.lineColor || 'rgba(75,192,192,1)',
          borderWidth: widget.lineWidth || 1,
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
          backgroundColor: widget.lineColor || 'rgba(75,192,192,1)',
          borderColor: widget.lineColor || 'rgba(75,192,192,1)',
          borderWidth: widget.lineWidth || 1,
          showLine: false,
          pointRadius: 5,
          type: 'scatter',
        },
      ],
    };
  },
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
