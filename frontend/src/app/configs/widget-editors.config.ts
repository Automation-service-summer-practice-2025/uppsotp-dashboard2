import { TextWidgetEditor } from '../features/editors/text-widget-editor/text-widget-editor';
import { WidgetConfig } from '../interfaces/widget.interface';

export const widgetEditorsConfig: WidgetConfig[] = [
  {
    name: 'text',
    component: TextWidgetEditor,
  },
];
