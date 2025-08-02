import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Widget } from '../interfaces/widget.interface';

@Injectable({
  providedIn: 'root',
})
export class EditSidebarService {
  private isOpenEditSidebar = new BehaviorSubject<boolean>(false);
  private currentWidget = new BehaviorSubject<Widget | null>(null);

  isOpen$ = this.isOpenEditSidebar.asObservable();
  currentWidget$ = this.currentWidget.asObservable();

  openEditSidebar(widget: Widget): void {
    this.isOpenEditSidebar.next(true);
    this.currentWidget.next(widget);
  }

  closeEditSidebar(): void {
    this.isOpenEditSidebar.next(false);
    this.currentWidget.next(null);
  }

  toggleSidebarFor(widget: Widget): void {
    const currentWidget = this.currentWidget.getValue();
    const isOpenSidebar = this.isOpenEditSidebar.getValue();
    isOpenSidebar && currentWidget?.id === widget.id
      ? this.closeEditSidebar()
      : this.openEditSidebar(widget);
  }
}
