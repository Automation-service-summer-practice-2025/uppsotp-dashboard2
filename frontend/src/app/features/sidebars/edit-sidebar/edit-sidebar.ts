import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { LucideAngularModule, LucideIconData, X } from 'lucide-angular';
import { EditSidebarService } from '../../../services/edit-sidebar.service';
import { Widget, WidgetConfig } from '../../../interfaces/widget.interface';
import { widgetConfigs } from '../../../configs/widget.config';
import { WidgetService } from '../../../services/widget.service';

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

  isOpenEditSidebar: boolean = false;
  widget?: Widget | undefined = undefined;
  destroyEditSidebar$ = new Subject<void>();
  btn_close: LucideIconData = X;
  widgetConfigs: Record<string, WidgetConfig> = widgetConfigs;

  constructor(
    private editsidebarServise: EditSidebarService,
    private widgetService: WidgetService
  ) {}

  ngOnInit() {
    combineLatest([
      this.editsidebarServise.currentWidget$,
      this.editsidebarServise.isOpen$,
    ])
      .pipe(takeUntil(this.destroyEditSidebar$))
      .subscribe(([currentWidget, isOpenEditSidebar]) => {
        this.widget = currentWidget;
        this.isOpenEditSidebar = isOpenEditSidebar;

        if (isOpenEditSidebar && currentWidget) {
          this.loadEditorComponent();
        }
      });
  }

  ngOnDestroy() {
    this.destroyEditSidebar$.next();
    this.destroyEditSidebar$.complete();
  }

  loadEditorComponent(): void {
    if (!this.widget) {
      console.log('Error: widget is underfined');
      return;
    }
    const editorComponent = this.widgetConfigs[this.widget.type].Editor;

    this.editorContainer.clear();
    const componentRef = this.editorContainer.createComponent(editorComponent);

    componentRef.setInput('widget', this.widget);
  }

  onClose(): void {
    this.editsidebarServise.closeEditSidebar();
  }

  onCancel(): void {}

  onSave(): void {}

  onDelete(): void {
    if (this.widget) {
      this.widgetService.delWidget(this.widget);
      this.editsidebarServise.closeEditSidebar();
    }
  }
}
