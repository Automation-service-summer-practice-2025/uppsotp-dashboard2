import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Widget } from '../interfaces/widget.interface';

@Injectable({
  providedIn: 'root',
})
export class EditSidebarService {
  private isOpenEditSidebar = new BehaviorSubject<boolean>(false);
  private widgetEditable = new BehaviorSubject<Widget | undefined>(undefined);

  isOpen$ = this.isOpenEditSidebar.asObservable();
  widgetEditable$ = this.widgetEditable.asObservable();

  openEditSidebar(widget: Widget): void {
    this.isOpenEditSidebar.next(true);
    this.widgetEditable.next(widget);
  }

  closeEditSidebar(): void {
    this.isOpenEditSidebar.next(false);
    this.widgetEditable.next(undefined);
  }
}
