import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Widget } from '../interfaces/widget.interface';
import { WidgetService } from './widget.service';
import { CurrentWidgetService } from './current-widget.service';

@Injectable({
  providedIn: 'root',
})
export class EditSidebarService {
  private isOpenEditSidebar = new BehaviorSubject<boolean>(false);

  isOpen$ = this.isOpenEditSidebar.asObservable();

  constructor(private currentWidgetService: CurrentWidgetService) {}

  openEditSidebar(widget: Widget): void {
    const currentWidget = this.currentWidgetService.getCurrentWidget();

    if (currentWidget && currentWidget.id === widget.id) {
      return;
    }

    this.currentWidgetService.setCurrentWidget(widget);
    this.isOpenEditSidebar.next(true);
  }

  closeEditSidebar(): void {
    this.currentWidgetService.clearCurrentWidget();
    this.isOpenEditSidebar.next(false);
  }
}
