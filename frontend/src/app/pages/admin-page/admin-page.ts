import { Component } from '@angular/core';
import { AppHeader } from '../../features/app-header/app-header';
import { Dashboard } from '../../features/dashboard/dashboard';
import { WidgetSidebar } from '../../features/widget-sidebar/widget-sidebar';

@Component({
  selector: 'admin-page',
  standalone: true,
  imports: [AppHeader, Dashboard, WidgetSidebar],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage {}
