import { TextWidgetContent } from '../features/widgets/text-widget/text-widget';
import { ImageWidgetContent } from '../features/widgets/image-widget/image-widget';
import { WidgetConfig } from '../interfaces/widget.interface';

export const widgetConfigs: WidgetConfig[] = [
  {
    name: 'text',
    component: TextWidgetContent,
  },
  {
    name: 'image',
    component: ImageWidgetContent,
  },
];
