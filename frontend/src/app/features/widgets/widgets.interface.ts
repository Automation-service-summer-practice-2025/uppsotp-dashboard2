import { GridsterItem } from 'angular-gridster2';
import { LucideIconData } from 'lucide-angular';

export interface DashboardWidget extends GridsterItem {
  id: string;
  type: string;
  data?: any;
  icon: LucideIconData;
}
