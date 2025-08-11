import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Widget, WidgetConfig } from '../../../interfaces/widget.interface';
import { widgetConfigs } from '../../../configs/widget.config';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'widget-render',
  imports: [LucideAngularModule],
  templateUrl: './widget-render.html',
  styleUrl: './widget-render.css',
})
export class WidgetRender implements AfterViewInit {
  @ViewChild('widgetContainer', { read: ViewContainerRef })
  widgetContainer!: ViewContainerRef;

  @Input() widget!: Widget;
  widgetConfigs: Record<string, WidgetConfig> = widgetConfigs;

  showDefaultIcon = false;
  defaultIcon: any;

  ngAfterViewInit(): void {
    this.showDefaultIcon = this.widget.isNull();

    if (this.showDefaultIcon && 'defaultIcon' in this.widget) {
      this.defaultIcon = this.widget['defaultIcon'];
    }

    if (!this.showDefaultIcon) {
      this.loadWidgetComponent();
    }
  }

  loadWidgetComponent(): void {
    const widgetComponent = this.widgetConfigs[this.widget.type]?.Component;

    if (!widgetComponent) {
      console.warn(`Компонент для виджета типа ${this.widget.type} не найден`);
      return;
    }

    this.widgetContainer.clear();
    const componentRef = this.widgetContainer.createComponent(widgetComponent);
    componentRef.setInput('widget', this.widget);
  }
}
