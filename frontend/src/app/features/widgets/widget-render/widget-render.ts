import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { widgetConfigs } from '../../../configs/widget.config';
import { WidgetConfig } from '../../../interfaces/widget.interface';
import { Widget } from '../../../interfaces/widget.interface';

@Component({
  selector: 'widget-render',
  imports: [],
  templateUrl: './widget-render.html',
  styleUrl: './widget-render.css',
})
export class WidgetRender implements AfterViewInit {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  dynamicComponentContainer!: ViewContainerRef;

  widgetConfigs: WidgetConfig[] = widgetConfigs;
  @Input() widget!: Widget;

  ngAfterViewInit(): void {
    this.loadDynamicComponent(this.widget.type);
  }

  loadDynamicComponent(componentName: string) {
    const config = this.widgetConfigs.find((c) => c.name === componentName);

    if (!config) {
      console.error(`Component with name '${componentName}' not found`);
      return;
    }

    this.dynamicComponentContainer.clear();
    const componentRef = this.dynamicComponentContainer.createComponent(
      config.component
    );

    componentRef.setInput('widget', this.widget);
  }
}
