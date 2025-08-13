import { Type, Image, ChartLine, Table } from 'lucide-angular';
import { WidgetSideBarBtn } from '../interfaces/widget-sb-btn.interface';

export const widgetSbBtnsConfig: WidgetSideBarBtn[] = [
  {
    name: 'text',
    label: 'Текст',
    icon: Type,
  },
  {
    name: 'image',
    label: 'Картинка/GIF',
    icon: Image,
  },
  {
    name: 'chart',
    label: 'График',
    icon: ChartLine,
  },
  {
    name: 'table',
    label: 'Таблица',
    icon: Table,
  },
];
