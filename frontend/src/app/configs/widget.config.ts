import { ImageWidgetComponent } from '../features/widgets/image-widget/image-widget';
import { ImageWidgetEditor } from '../features/editors/image-widget-editor/image-widget-editor';

import { TextWidgetComponent } from '../features/widgets/text-widget/text-widget';
import { TextWidgetEditor } from '../features/editors/text-widget-editor/text-widget-editor';

import { ImageWidget, TextWidget } from '../interfaces/widget-classes';
import { WidgetConfig } from '../interfaces/widget.interface';

export const widgetConfigs: Record<string, WidgetConfig> = {
  text: {
    Component: TextWidgetComponent,
    Editor: TextWidgetEditor,
    Widget: TextWidget,
  },
  image: {
    Component: ImageWidgetComponent,
    Editor: ImageWidgetEditor,
    Widget: ImageWidget,
  },
};
