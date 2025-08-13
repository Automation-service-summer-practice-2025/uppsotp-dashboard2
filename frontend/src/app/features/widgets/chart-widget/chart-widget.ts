import { Component, Input } from '@angular/core';
import { ChartWidget } from '../../../interfaces/widget-classes';
import { BaseChartDirective } from 'ng2-charts';
import { ChartLine, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'chart-widget',
  imports: [BaseChartDirective, LucideAngularModule],
  templateUrl: './chart-widget.html',
  styleUrls: ['./chart-widget.css'],
})
export class ChartWidgetComponent {
  @Input() widget!: ChartWidget;

  chartIcon = ChartLine;
}
