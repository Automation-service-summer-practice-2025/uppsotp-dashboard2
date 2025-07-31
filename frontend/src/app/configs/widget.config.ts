import { Type } from '@angular/core';
import { TextWidget } from '../features/widgets/text-widget/text-widget';
import { ImageWidget } from '../features/widgets/image-widget/image-widget';

export interface WidgetConfig {
  name: string;
  component: Type<any>;
}

export const componentConfigs: WidgetConfig[] = [
  {
    name: 'text',
    component: TextWidget,
  },
  {
    name: 'image',
    component: ImageWidget,
  },
];
