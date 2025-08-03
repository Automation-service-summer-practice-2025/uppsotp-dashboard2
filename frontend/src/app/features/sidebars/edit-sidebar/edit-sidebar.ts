import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditSidebarService } from '../../../services/edit-sidebar.service';
import { Subject, takeUntil } from 'rxjs';
import { LucideAngularModule, LucideIconData, X } from 'lucide-angular';
import { Widget } from '../../../interfaces/widget.interface';
import { EditorRender } from '../../editors/editor-render/editor-render';

@Component({
  selector: 'edit-sidebar',
  standalone: true,
  imports: [LucideAngularModule, EditorRender],
  templateUrl: './edit-sidebar.html',
  styleUrl: './edit-sidebar.css',
})
export class EditSidebar implements OnInit, OnDestroy {
  isOpenEditSidebar: boolean = false;
  widget?: Widget | undefined = undefined;
  private destroyEditSidebar$ = new Subject<void>();
  btn_close: LucideIconData = X;

  constructor(private editsidebarServise: EditSidebarService) {}

  ngOnInit() {
    this.editsidebarServise.isOpen$
      .pipe(takeUntil(this.destroyEditSidebar$))
      .subscribe((isOpenEditSidebar) => {
        this.isOpenEditSidebar = isOpenEditSidebar;
      });

    this.editsidebarServise.currentWidget$
      .pipe(takeUntil(this.destroyEditSidebar$))
      .subscribe((currentWidget) => {
        this.widget = currentWidget;
      });
  }

  ngOnDestroy() {
    this.destroyEditSidebar$.next();
    this.destroyEditSidebar$.complete();
  }

  closedEditSidebar(): void {
    this.editsidebarServise.closeEditSidebar();
  }
}
