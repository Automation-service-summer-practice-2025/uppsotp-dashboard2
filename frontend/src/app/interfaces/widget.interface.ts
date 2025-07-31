import { Type } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';

export interface Widget extends GridsterItem {
  id: string;
  type: string;
}

export interface WidgetConfig {
  name: string;
  component: Type<any>;
}
