import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Widget } from '../interfaces/widget.interface';
import { Editor } from 'ngx-editor';

@Injectable({
  providedIn: 'root',
})
export class EditSidebarService {
  private isOpenEditSidebar = new BehaviorSubject<boolean>(false);
  private currentWidget = new BehaviorSubject<Widget | undefined>(undefined);
  private editorSubject = new BehaviorSubject<Editor>(new Editor());

  isOpen$ = this.isOpenEditSidebar.asObservable();
  currentWidget$ = this.currentWidget.asObservable();
  editor$ = this.editorSubject.asObservable();

  openEditSidebar(widget: Widget): void {
    this.isOpenEditSidebar.next(true);
    this.currentWidget.next(widget);
  }

  closeEditSidebar(): void {
    this.isOpenEditSidebar.next(false);
    this.currentWidget.next(undefined);
  }

  toggleSidebarFor(widget: Widget): void {
    const currentWidget = this.currentWidget.getValue();
    const isOpenSidebar = this.isOpenEditSidebar.getValue();
    isOpenSidebar && currentWidget?.id === widget.id
      ? this.closeEditSidebar()
      : this.openEditSidebar(widget);
  }

  setEditor(editor: Editor): void {
    this.editorSubject.next(editor);
  }

  getEditorValue(): Editor {
    return this.editorSubject.getValue();
  }
}
