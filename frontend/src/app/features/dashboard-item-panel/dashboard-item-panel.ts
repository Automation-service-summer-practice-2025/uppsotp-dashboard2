import { Component } from '@angular/core';
import { LucideAngularModule, Pencil, Move, X } from 'lucide-angular';
import { EditSidebarService } from '../../services/edit-sidebar.service';

@Component({
  selector: 'dashboard-item-panel',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './dashboard-item-panel.html',
  styleUrl: './dashboard-item-panel.css',
})
export class DashboardItemPanel {
  readonly buttons = {
    edit: Pencil,
    move: Move,
    delete: X,
  };

  constructor(private editsidebarServise: EditSidebarService) {}

  editWidget(widgetId: number): void {
    this.editsidebarServise.closeEditSidebar();
    this.editsidebarServise.openEditSidebar(widgetId);
    console.log('Редактируется виджет:', widgetId);
  }

  deleteWidget(widgetId: number): void {
    console.log('Удален виджет:', widgetId);
  }
}
