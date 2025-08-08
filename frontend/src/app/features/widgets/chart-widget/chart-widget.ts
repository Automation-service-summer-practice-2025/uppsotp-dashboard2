import { Component, Input } from '@angular/core';
import { ChartWidget } from '../../../interfaces/widget-classes';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'chart-widget',
  imports: [BaseChartDirective],
  templateUrl: './chart-widget.html',
  styleUrls: ['./chart-widget.css'],
})
export class ChartWidgetComponent {
  // @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;
  @Input() widget!: ChartWidget;
}
