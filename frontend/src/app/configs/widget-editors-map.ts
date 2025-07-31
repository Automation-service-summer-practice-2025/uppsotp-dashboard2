import { Type } from '@angular/core';
import { TextWidgetEditor } from '../features/widgets-editor/text-widget-editor/text-widget-editor';
import { ImageWidgetEditor } from '../features/widgets-editor/image-widget-editor/image-widget-editor';
import { ScatterWidgetEditor } from '../features/widgets-editor/scatter-widget-editor/scatter-widget-editor';
import { HistogramWidgetEditor } from '../features/widgets-editor/histogram-widget-editor/histogram-widget-editor';

export const widgetEditorsMap: { [key: string]: Type<any> } = {
  text: TextWidgetEditor,
  image: ImageWidgetEditor,
  scatter: ScatterWidgetEditor,
  histogram: HistogramWidgetEditor,
};
