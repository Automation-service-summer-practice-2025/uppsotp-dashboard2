import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Widget } from '../interfaces/widget.interface';

@Injectable({
  providedIn: 'root',
})
export class EditSidebarService {
  private isOpenEditSidebar = new BehaviorSubject<boolean>(false);
  private currentWidget = new BehaviorSubject<Widget | undefined>(undefined);

  isOpen$ = this.isOpenEditSidebar.asObservable();
  currentWidget$ = this.currentWidget.asObservable();

  openEditSidebar(widget: Widget): void {
    const currentWidget = this.currentWidget.getValue();
    if (!currentWidget || widget.id != currentWidget.id) {
      this.isOpenEditSidebar.next(true);
      this.currentWidget.next(widget);
    }
  }

  closeEditSidebar(): void {
    this.isOpenEditSidebar.next(false);
    this.currentWidget.next(undefined);
  }
}
