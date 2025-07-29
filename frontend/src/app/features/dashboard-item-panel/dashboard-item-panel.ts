import { Component } from '@angular/core';
import { LucideAngularModule, Pencil, Move, X } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-item-panel',
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

  editWidget(idWidget: number): void {
    console.log('Редактируется виджет:', idWidget);
  }

  deleteWidget(idWidget: number): void {
    console.log('Удален виджет:', idWidget);
  }
}
