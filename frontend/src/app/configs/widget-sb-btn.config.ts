import { Type, Image, ChartScatter, ChartColumn } from 'lucide-angular';
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
  // {
  //   name: 'scatter',
  //   label: 'Точечный график',
  //   icon: ChartScatter,
  //   tooltip: 'Точечный график',
  // },
  // {
  //   name: 'histogram',
  //   label: 'Гистограмма',
  //   icon: ChartColumn,
  //   tooltip: 'Гистограмма',
  // },
];
