import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditSidebarService } from '../../services/edit-sidebar.service';
import { Subject, takeUntil } from 'rxjs';
import { LucideAngularModule, LucideIconData, X } from 'lucide-angular';
import { WidgetEditorRender } from '../editors/widget-editor-render/widget-editor-render';

@Component({
  selector: 'edit-sidebar',
  standalone: true,
  imports: [LucideAngularModule, WidgetEditorRender],
  templateUrl: './edit-sidebar.html',
  styleUrl: './edit-sidebar.css',
})
export class EditSidebar implements OnInit, OnDestroy {
  isOpenEditSidebar: boolean = false;
  private destroyService$ = new Subject<void>();
  btn_close: LucideIconData = X;

  constructor(private editsidebarServise: EditSidebarService) {}

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

  closedEditSidebar(): void {
    this.editsidebarServise.closeEditSidebar();
  }
}
