import { Component, Input } from '@angular/core';
import { TextWidget } from '../../../interfaces/widget-classes';
import { Editor, NgxEditorComponent } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { EditSidebarService } from '../../../services/edit-sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'text-widget',
  imports: [NgxEditorComponent, FormsModule],
  templateUrl: './text-widget.html',
  styleUrl: './text-widget.css',
})
export class TextWidgetComponent {
  @Input() widget!: TextWidget;

  editor!: Editor;

  constructor(private editSidebarService: EditSidebarService) {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.editSidebarService.setEditor(this.editor);
    console.log('Editor создан');
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    // this.editSidebarService.setEditor(); // Очищаем при уничтожении
  }
}
