import { Type, Image } from 'lucide-angular';
import { WidgetSideBarBtn } from '../interfaces/widget-sb-btn.interface';

export const widgetSbBtnsConfig: WidgetSideBarBtn[] = [
  {
    name: 'text',
    label: 'Текст',
    icon: Type,
    tooltip: 'Текстовый виджет',
  },
  {
    name: 'image',
    label: 'Картинка',
    icon: Image,
    tooltip: 'Изображение',
  },
];
