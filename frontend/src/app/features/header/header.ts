import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CurrentWidgetService } from '../../services/current-widget.service';
import { ViewModeService } from '../../services/view-mode.service';

@Component({
  selector: 'header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  isAdminMode: boolean = false;

  private viewModeSub = new Subscription();

  constructor(
    private router: Router,
    private currentWidgetService: CurrentWidgetService,
    private viewModeService: ViewModeService
  ) {}

  ngOnInit(): void {
    this.viewModeSub = this.viewModeService.isAdminMode$.subscribe(
      (isAdminMode) => (this.isAdminMode = isAdminMode)
    );
  }

  redirectToPage(endpoint: string) {
    this.currentWidgetService.clearCurrentWidget();
    this.router.navigate([endpoint]);
  }

  ngOnDestroy() {
    this.viewModeSub.unsubscribe();
  }
}
