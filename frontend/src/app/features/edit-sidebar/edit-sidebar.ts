import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';
import { EditSidebarService } from '../../services/edit-sidebar.service';
import { LucideAngularModule, LucideIconData, X } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { WidgetService } from '../../services/widget.service';
import { widgetEditorsMap } from '../../configs/widget-editors-map';
import { Widget } from '../../interfaces/widget.interface';

@Component({
  selector: 'edit-sidebar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './edit-sidebar.html',
  styleUrl: './edit-sidebar.css',
})
export class EditSidebar implements OnInit, OnDestroy {
  isOpenEditSidebar: boolean = false;
  widgetId?: string;
  btn_close: LucideIconData = X;

  @ViewChild('editorContainer', { read: ViewContainerRef, static: true })
  editorContainer!: ViewContainerRef;
  private componentRef?: ComponentRef<any>;
  private subscriptions = new Subscription();
  private widgetsList: Widget[] = [];

  constructor(
    private editsidebarServise: EditSidebarService,
    private widgetService: WidgetService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.editsidebarServise.isOpen$.subscribe((isOpen) => {
        this.isOpenEditSidebar = isOpen;
      })
    );

    this.subscriptions.add(
      this.editsidebarServise.widgetEditableId$.subscribe((widgetId) => {
        this.widgetId = widgetId;

        this.loadEditorComponent(widgetId);
      })
    );

    this.subscriptions.add(
      this.widgetService.widgets$.subscribe((widgets) => {
        this.widgetsList = widgets;
      })
    );
  }

  private loadEditorComponent(widgetId: string) {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = undefined;
    }

    if (!widgetId) {
      return;
    }

    const widget = this.widgetsList.find((w) => w.id === widgetId);

    if (!widget) {
      console.warn('Widget not found with id:', widgetId);
      return;
    }

    const editorComponent = widgetEditorsMap[widget.type];

    if (!editorComponent) {
      console.warn('No editor component found for widget type:', widget.type);
      return;
    }

    this.componentRef = this.editorContainer.createComponent(editorComponent);

    if (this.componentRef.instance) {
      this.componentRef.instance.widget = widget;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  closedEditSidebar(): void {
    this.editsidebarServise.closeEditSidebar();
  }
}
