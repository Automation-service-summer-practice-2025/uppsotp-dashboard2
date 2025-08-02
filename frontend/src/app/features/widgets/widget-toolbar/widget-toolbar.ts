import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LucideAngularModule, Pencil, Move, X } from 'lucide-angular';
import { EditSidebarService } from '../../../services/edit-sidebar.service';
import { WidgetService } from '../../../services/widget.service';
import { Subject, takeUntil } from 'rxjs';
import { Widget } from '../../../interfaces/widget.interface';

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
  @Input() newWidget!: Widget;
  isOpenEditSidebar: boolean = false;
  widget!: Widget;
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

    this.editsidebarServise.currentWidget$
      .pipe(takeUntil(this.destroyEditSidebar$))
      .subscribe((currentWidget) => {
        if (currentWidget) {
          this.widget = currentWidget;
        }
      });
  }
  ngOnDestroy() {
    this.destroyEditSidebar$.next();
    this.destroyEditSidebar$.complete();
  }

  editWidget(newWidget: Widget): void {
    if (this.isOpenEditSidebar && this.widget.id === newWidget.id) {
      this.editsidebarServise.closeEditSidebar();
    } else {
      this.editsidebarServise.openEditSidebar(newWidget);
    }
  }

  delWidget(widget: Widget): void {
    this.editsidebarServise.closeEditSidebar();
    this.widgetService.delWidget(widget);
  }
}
