import { Type, Image, ChartLine, Table } from 'lucide-angular';
import { WidgetSideBarBtn } from '../interfaces/widget-sb-btn.interface';

export const widgetSbBtnsConfig: WidgetSideBarBtn[] = [
  {
    name: 'Text',
    label: 'Текст',
    icon: Type,
  },
  {
    name: 'Image',
    label: 'Изображение',
    icon: Image,
  },
  {
    name: 'Chart',
    label: 'График',
    icon: ChartLine,
  },
  {
    name: 'Table',
    label: 'Таблица',
    icon: Table,
  },
];
