import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditSidebarService {
  private isOpenEditSidebar = new BehaviorSubject<boolean>(false);
  private widgetEditableId = new BehaviorSubject<string>('');

  isOpen$ = this.isOpenEditSidebar.asObservable();
  widgetEditableId$ = this.widgetEditableId.asObservable();

  openEditSidebar(widgetId: string): void {
    this.isOpenEditSidebar.next(true);
    this.widgetEditableId.next(widgetId);
  }

  closeEditSidebar(): void {
    this.isOpenEditSidebar.next(false);
    this.widgetEditableId.next('');
  }
}
