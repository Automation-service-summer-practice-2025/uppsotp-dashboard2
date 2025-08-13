import { ImageWidgetComponent } from '../features/widgets/image-widget/image-widget';
import { ImageWidgetEditor } from '../features/editors/image-widget-editor/image-widget-editor';

import { TextWidgetComponent } from '../features/widgets/text-widget/text-widget';
import { TextWidgetEditor } from '../features/editors/text-widget-editor/text-widget-editor';

import {
  ChartWidget,
  ImageWidget,
  TableWidget,
  TextWidget,
} from '../interfaces/widget-classes';
import { WidgetConfig } from '../interfaces/widget.interface';
import { ChartWidgetComponent } from '../features/widgets/chart-widget/chart-widget';
import { ChartWidgetEditor } from '../features/editors/chart-widget-editor/chart-widget-editor';
import { TableWidgetComponent } from '../features/widgets/table-widget/table-widget';
import { TableWidgetEditor } from '../features/editors/table-widget-editor/table-widget-editor';

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
  chart: {
    Component: ChartWidgetComponent,
    Editor: ChartWidgetEditor,
    Widget: ChartWidget,
  },
  table: {
    Component: TableWidgetComponent,
    Editor: TableWidgetEditor,
    Widget: TableWidget,
  },
};
