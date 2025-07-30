import { Component, Input } from '@angular/core';
import { LucideAngularModule, Pencil, Move, X } from 'lucide-angular';
import { EditSidebarService } from '../../services/edit-sidebar.service';

@Component({
  selector: 'widget-toolbar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './widget-toolbar.html',
  styleUrl: './widget-toolbar.css',
})
export class WidgetToolbar {
  readonly buttons = {
    edit: Pencil,
    move: Move,
    delete: X,
  };
  @Input() widgetId!: string;
  constructor(private editsidebarServise: EditSidebarService) {}

  editWidget(widgetId: string): void {
    this.editsidebarServise.closeEditSidebar();
    this.editsidebarServise.openEditSidebar(widgetId);
  }

  deleteWidget(widgetId: string): void {
    console.log('Удален виджет:', widgetId);
  }
}
