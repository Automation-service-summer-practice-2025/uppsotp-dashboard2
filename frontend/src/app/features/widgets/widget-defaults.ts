import { DashboardWidget } from './widgets.interface';

type WidgetType = DashboardWidget['type'];

export interface WidgetDefaultConfig {
  cols: number;
  rows: number;
  data: any;
}

export const widgetDefaultConfigs: Record<WidgetType, WidgetDefaultConfig> = {
  text: {
    cols: 3,
    rows: 3,
    data: null,
  },
  image: {
    cols: 3,
    rows: 3,
    data: null,
  },
  // scatter: {
  //   cols: 5,
  //   rows: 4,
  //   data: { points: [] },
  // },
  // histogram: {
  //   cols: 5,
  //   rows: 4,
  //   data: { values: [] },
  // },
};
