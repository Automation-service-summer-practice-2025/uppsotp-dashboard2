import { Image, LucideIconData, Type } from 'lucide-angular';
import { DashboardWidget } from './widgets.interface';

type WidgetType = DashboardWidget['type'];

export interface WidgetDefaultConfig {
  cols: number;
  rows: number;
  data: any;
  icon: LucideIconData;
}

export const widgetDefaultConfigs: Record<WidgetType, WidgetDefaultConfig> = {
  text: {
    cols: 3,
    rows: 3,
    data: null,
    icon: Type,
  },
  image: {
    cols: 3,
    rows: 3,
    data: null,
    icon: Image,
  },
  // scatter: {
  //   cols: 5,
  //   rows: 4,
  //   data: { points: [] },
  //   icon: ...
  // },
  // histogram: {
  //   cols: 5,
  //   rows: 4,
  //   data: { values: [] },
  //   icon: ...
  // },
};
