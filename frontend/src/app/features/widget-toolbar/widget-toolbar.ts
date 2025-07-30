import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LucideAngularModule, Pencil, Move, X } from 'lucide-angular';
import { EditSidebarService } from '../../services/edit-sidebar.service';
import { WidgetService } from '../../services/widget.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'widget-toolbar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './widget-toolbar.html',
  styleUrl: './widget-toolbar.css',
})
export class WidgetToolbar implements OnInit, OnDestroy {
  readonly buttons = {
    edit: Pencil,
    move: Move,
    delete: X,
  };
  @Input() newWidgetId!: string;
  isOpenEditSidebar: boolean = false;
  widgetId!: string;
  private destroyEditSidebar$ = new Subject<void>();

  constructor(
    private editsidebarServise: EditSidebarService,
    private widgetService: WidgetService
  ) {}

  ngOnInit() {
    this.editsidebarServise.isOpen$
      .pipe(takeUntil(this.destroyEditSidebar$))
      .subscribe((isOpenEditSidebar) => {
        this.isOpenEditSidebar = isOpenEditSidebar;
      });

    this.editsidebarServise.widgetEditableId$
      .pipe(takeUntil(this.destroyEditSidebar$))
      .subscribe((widgetId) => {
        this.widgetId = widgetId;
      });
  }
  ngOnDestroy() {
    this.destroyEditSidebar$.next();
    this.destroyEditSidebar$.complete();
  }

  editWidget(newWidgetId: string): void {
    if (this.isOpenEditSidebar && this.widgetId === newWidgetId) {
      this.editsidebarServise.closeEditSidebar();
    } else {
      this.editsidebarServise.openEditSidebar(newWidgetId);
    }
  }

  deleteWidget(widgetId: string): void {
    this.editsidebarServise.closeEditSidebar();
    this.widgetService.delWidget(widgetId);
  }
}
