import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Widget, WidgetConfig } from '../../../interfaces/widget.interface';
import { widgetConfigs } from '../../../configs/widget.config';

@Component({
  selector: 'widget-render',
  imports: [],
  templateUrl: './widget-render.html',
  styleUrl: './widget-render.css',
})
export class WidgetRender implements AfterViewInit {
  @ViewChild('widgetContainer', { read: ViewContainerRef })
  widgetContainer!: ViewContainerRef;

  @Input() widget!: Widget;
  widgetConfigs: Record<string, WidgetConfig> = widgetConfigs;

  ngAfterViewInit(): void {
    this.loadWidgetComponent();
  }

  loadWidgetComponent(): void {
    const widgetComponent = this.widgetConfigs[this.widget.type].Component;

    this.widgetContainer.clear();
    const componentRef = this.widgetContainer.createComponent(widgetComponent);

    componentRef.setInput('widget', this.widget);
  }
}
