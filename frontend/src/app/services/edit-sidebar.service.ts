import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Widget } from '../interfaces/widget.interface';
import { WidgetService } from './widget.service';

@Injectable({
  providedIn: 'root',
})
export class EditSidebarService {
  private isOpenEditSidebar = new BehaviorSubject<boolean>(false);
  private currentWidget = new BehaviorSubject<Widget | undefined>(undefined);

  isOpen$ = this.isOpenEditSidebar.asObservable();
  currentWidget$ = this.currentWidget.asObservable();

  constructor(private widgetService: WidgetService) {}

  openEditSidebar(widget: Widget): void {
    const currentWidget = this.currentWidget.getValue();

    if (currentWidget && currentWidget.id === widget.id) {
      return;
    } else if (currentWidget) {
      this.widgetService.saveWidget(currentWidget);
    }
    this.isOpenEditSidebar.next(true);
    this.currentWidget.next(widget);
  }

  closeEditSidebar(): void {
    const currentWidget = this.currentWidget.getValue();

    if (currentWidget) {
      this.widgetService.saveWidget(currentWidget);
    }

    this.isOpenEditSidebar.next(false);
    this.currentWidget.next(undefined);
  }
}
