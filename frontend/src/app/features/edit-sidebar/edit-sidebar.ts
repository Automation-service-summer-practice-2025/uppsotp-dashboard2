import { Component, OnInit } from '@angular/core';
import { EditSidebarService } from '../../services/edit-sidebar.service';
import { Subject, takeUntil } from 'rxjs';
import { LucideAngularModule, LucideIconData, X } from 'lucide-angular';

@Component({
  selector: 'edit-sidebar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './edit-sidebar.html',
  styleUrl: './edit-sidebar.css',
})
export class EditSidebar implements OnInit {
  isOpen: boolean = false;
  widgetId: string | null = null;
  private destroyEditSidebar$ = new Subject<void>();
  btn_close: LucideIconData = X;

  constructor(private editsidebarServise: EditSidebarService) {}

  ngOnInit() {
    this.editsidebarServise.isOpen$
      .pipe(takeUntil(this.destroyEditSidebar$))
      .subscribe((isOpen) => {
        this.isOpen = isOpen;
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

  closedEditSidebar(): void {
    this.editsidebarServise.closeEditSidebar();
  }
}
