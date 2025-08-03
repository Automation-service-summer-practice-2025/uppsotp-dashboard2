import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Widget, WidgetConfig } from '../../../interfaces/widget.interface';
import { widgetConfigs } from '../../../configs/widget.config';

@Component({
  selector: 'editor-render',
  imports: [],
  templateUrl: './editor-render.html',
  styleUrl: './editor-render.css',
})
export class EditorRender implements AfterViewInit {
  @ViewChild('editorContainer', { read: ViewContainerRef })
  editorContainer!: ViewContainerRef;

  @Input() widget?: Widget;
  widgetConfigs: Record<string, WidgetConfig> = widgetConfigs;

  ngAfterViewInit(): void {
    this.loadEditorComponent();
  }

  loadEditorComponent() {
    if (!this.widget) {
      console.log('Widget is underfined');
      return;
    }
    console.log('widget:', this.widget);
    const editorComponent = this.widgetConfigs[this.widget.type].Editor;

    this.editorContainer.clear();
    const componentRef = this.editorContainer.createComponent(editorComponent);

    componentRef.setInput('widget', this.widget);
  }
}
