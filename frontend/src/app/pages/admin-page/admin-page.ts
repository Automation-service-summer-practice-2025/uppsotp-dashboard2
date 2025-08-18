import { Component, OnDestroy, OnInit } from '@angular/core';
import { Header } from '../../features/header/header';
import { Dashboard } from '../../features/dashboard/dashboard';
import { WidgetSidebar } from '../../features/sidebars/widget-sidebar/widget-sidebar';
import { EditSidebar } from '../../features/sidebars/edit-sidebar/edit-sidebar';
import { Subject, takeUntil } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { ViewModeService } from '../../services/view-mode.service';
import { CurrentWidgetService } from '../../services/current-widget.service';

@Component({
  selector: 'admin-page',
  standalone: true,
  imports: [Header, Dashboard, WidgetSidebar, EditSidebar],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
  animations: [
    trigger('OpenCloseAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class AdminPage implements OnInit, OnDestroy {
  isEditSidebarOpen: boolean = false;
  private destroyEditSidebar$ = new Subject<void>();

  constructor(
    private currentWidgetService: CurrentWidgetService,
    private viewModeService: ViewModeService
  ) {
    this.viewModeService.setEditMode(true);
  }
  ngOnInit() {
    this.currentWidgetService.currentWidget$
      .pipe(takeUntil(this.destroyEditSidebar$))
      .subscribe((currentWidget) => {
        this.isEditSidebarOpen = !!currentWidget;
      });
  }

  ngOnDestroy() {
    this.destroyEditSidebar$.next();
    this.destroyEditSidebar$.complete();
  }
}
