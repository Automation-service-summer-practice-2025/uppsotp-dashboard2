import {
  Type,
  Image,
  ChartScatter,
  ChartColumn,
  LucideIconData,
} from 'lucide-angular';

export interface WidgetSideBarButton {
  name: string;
  label: string;
  icon: LucideIconData;
  tooltip: string;
}

export const widgetSidebarButtons: WidgetSideBarButton[] = [
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
