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

  editWidget(idWidget: number): void {
    this.editsidebarServise.closeEditSidebar();
    this.editsidebarServise.openEditSidebar(idWidget);
    console.log('Редактируется виджет:', idWidget);
  }

  deleteWidget(idWidget: number): void {
    console.log('Удален виджет:', idWidget);
  }
}
