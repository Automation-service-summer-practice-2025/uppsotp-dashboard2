import { TextWidget } from '../features/widgets/text-widget/text-widget';
import { ImageWidget } from '../features/widgets/image-widget/image-widget';
import { WidgetConfig } from '../interfaces/widget.interface';

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
