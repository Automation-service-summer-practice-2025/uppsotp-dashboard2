import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditSidebarService } from '../../services/edit-sidebar.service';
import { Subject, takeUntil } from 'rxjs';
import { LucideAngularModule, LucideIconData, X } from 'lucide-angular';
import { TextWidgetEditor } from '../../editors/text-widget-editor/text-widget-editor';
import { WidgetService } from '../../services/widget.service';
import { Widget } from '../../interfaces/widget.interface';
import { widgetEditorsConfig } from '../../configs/widget-editors.config';

@Component({
  selector: 'edit-sidebar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './edit-sidebar.html',
  styleUrl: './edit-sidebar.css',
})
export class EditSidebar implements OnInit, OnDestroy {
  isOpenEditSidebar: boolean = false;
  widget: Widget | null = null;
  private destroyService$ = new Subject<void>();
  btn_close: LucideIconData = X;

  constructor(private editsidebarServise: EditSidebarService) {}

  ngOnInit() {
    this.editsidebarServise.isOpen$
      .pipe(takeUntil(this.destroyService$))
      .subscribe((isOpenEditSidebar) => {
        this.isOpenEditSidebar = isOpenEditSidebar;
      });

    this.editsidebarServise.widgetEditable$
      .pipe(takeUntil(this.destroyService$))
      .subscribe((widget) => {
        this.widget = widget;
      });
  }

  ngOnDestroy() {
    this.destroyService$.next();
    this.destroyService$.complete();
  }

  closedEditSidebar(): void {
    this.editsidebarServise.closeEditSidebar();
  }
}
