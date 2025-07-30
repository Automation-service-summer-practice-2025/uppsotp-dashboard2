import { GridsterItem } from 'angular-gridster2';

export interface Widget extends GridsterItem {
  id: string;
  type: string;
}
