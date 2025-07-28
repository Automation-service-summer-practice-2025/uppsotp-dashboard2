import { GridsterItem } from 'angular-gridster2';

export interface DashboardWidget extends GridsterItem {
  id: string;
  type: string;
  data?: any;
}
