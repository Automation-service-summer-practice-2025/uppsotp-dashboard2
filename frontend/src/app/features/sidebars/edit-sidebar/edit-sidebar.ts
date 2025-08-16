import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LucideAngularModule, LucideIconData, X } from 'lucide-angular';
import { Widget, WidgetConfig } from '../../../interfaces/widget.interface';
import { widgetConfigs } from '../../../configs/widget.config';
import { WidgetService } from '../../../services/widget.service';
import { CurrentWidgetService } from '../../../services/current-widget.service';

@Component({
  selector: 'edit-sidebar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './edit-sidebar.html',
  styleUrl: './edit-sidebar.css',
})
export class EditSidebar implements OnInit, OnDestroy {
  @ViewChild('editorContainer', { read: ViewContainerRef, static: true })
  editorContainer!: ViewContainerRef;

  widget!: Widget;
  destroyEditSidebar$ = new Subject<void>();
  btn_close: LucideIconData = X;
  widgetConfigs: Record<string, WidgetConfig> = widgetConfigs;

  constructor(
    private currentWidgetService: CurrentWidgetService,
    private widgetService: WidgetService
  ) {}

  ngOnInit() {
    this.currentWidgetService.currentWidget$
      .pipe(takeUntil(this.destroyEditSidebar$))
      .subscribe((currentWidget) => {
        if (currentWidget) {
          this.widget = currentWidget;
          this.loadEditorComponent();
        } else {
          this.editorContainer.clear();
        }
      });
  }

  ngOnDestroy() {
    this.destroyEditSidebar$.next();
    this.destroyEditSidebar$.complete();
  }

  loadEditorComponent(): void {
    const editorComponent = this.widgetConfigs[this.widget.type].Editor;

    this.editorContainer.clear();
    const componentRef = this.editorContainer.createComponent(editorComponent);

    componentRef.setInput('widget', this.widget);
  }

  onClose(): void {
    this.currentWidgetService.clearCurrentWidget();
  }

  onDelete(): void {
    this.widgetService.deleteWidget(this.widget);
    this.currentWidgetService.clearCurrentWidget();
  }
}
