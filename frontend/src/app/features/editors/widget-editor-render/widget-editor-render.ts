import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Widget, WidgetConfig } from '../../../interfaces/widget.interface';
import { widgetEditorsConfig } from '../../../configs/widget-editors.config';
import { Subject, takeUntil } from 'rxjs';
import { EditSidebarService } from '../../../services/edit-sidebar.service';

@Component({
  selector: 'widget-editor-render',
  standalone: true,
  imports: [],
  templateUrl: './widget-editor-render.html',
  styleUrl: './widget-editor-render.css',
})
export class WidgetEditorRender implements OnInit, OnDestroy {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  dynamicComponentContainer!: ViewContainerRef;

  componentConfigs: WidgetConfig[] = widgetEditorsConfig;
  widget: Widget | undefined = undefined;
  private destroyService$ = new Subject<void>();

  constructor(private editsidebarServise: EditSidebarService) {}

  ngOnInit() {
    this.editsidebarServise.widgetEditable$
      .pipe(takeUntil(this.destroyService$))
      .subscribe((widget) => {
        this.widget = widget;
        if (this.widget) {
          this.loadDynamicComponent(this.widget.type);
        }
      });
  }

  ngOnDestroy() {
    this.destroyService$.next();
    this.destroyService$.complete();
  }

  loadDynamicComponent(componentName: string) {
    const config = this.componentConfigs.find((c) => c.name === componentName);

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
