import { Component } from '@angular/core';
import { Header } from '../../features/header/header';
import { Dashboard } from '../../features/dashboard/dashboard';
import { WidgetSidebar } from '../../features/widget-sidebar/widget-sidebar';
import { EditSidebar } from '../../features/edit-sidebar/edit-sidebar';
import { EditSidebarService } from '../../services/edit-sidebar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-page',
  standalone: true,
  imports: [Header, Dashboard, WidgetSidebar, EditSidebar],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage {
  isEditSidebarOpen: boolean = false;
  private destroyEditSidebar$ = new Subject<void>();

  constructor(private editsidebarServise: EditSidebarService) {}

  ngOnInit() {
    this.editsidebarServise.isOpen$
      .pipe(takeUntil(this.destroyEditSidebar$))
      .subscribe((isOpen) => {
        this.isEditSidebarOpen = isOpen;
      });
  }

  ngOnDestroy() {
    this.destroyEditSidebar$.next();
    this.destroyEditSidebar$.complete();
  }
}
