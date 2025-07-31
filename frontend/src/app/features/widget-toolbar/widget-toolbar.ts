import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LucideAngularModule, Pencil, Move, X } from 'lucide-angular';
import { EditSidebarService } from '../../services/edit-sidebar.service';
import { WidgetService } from '../../services/widget.service';
import { Subject, takeUntil } from 'rxjs';
import { Widget } from '../../interfaces/widget.interface';

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
  oldWidgetId: string = '';
  isOpenEditSidebar: boolean = false;
  private destroyService$ = new Subject<void>();

  constructor(
    private editsidebarServise: EditSidebarService,
    private widgetService: WidgetService
  ) {}

  ngOnInit() {
    this.editsidebarServise.isOpen$
      .pipe(takeUntil(this.destroyService$))
      .subscribe((isOpenEditSidebar) => {
        this.isOpenEditSidebar = isOpenEditSidebar;
      });
  }

  ngOnDestroy() {
    this.destroyService$.next();
    this.destroyService$.complete();
  }

  editWidget(newWidget: Widget): void {
    console.log(newWidget.id, '||', this.oldWidgetId);
    if (this.editsidebarServise.isOpen$ && this.oldWidgetId === newWidget.id) {
      this.editsidebarServise.closeEditSidebar();
      this.oldWidgetId = ''; // костыль
      console.log('Close', this.oldWidgetId);
    } else {
      this.editsidebarServise.openEditSidebar(newWidget);
      // this.oldWidgetId = '';
      this.oldWidgetId = newWidget.id;
      console.log('Open', this.oldWidgetId);
    }
  }

  deleteWidget(widgetId: string): void {
    this.editsidebarServise.closeEditSidebar();
    this.widgetService.delWidget(widgetId);
  }
}
