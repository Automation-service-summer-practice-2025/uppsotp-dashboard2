import { Type } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { v4 as uuidv4 } from 'uuid';

export interface WidgetConfig {
  Component: Type<any>;
  Editor: Type<any>;
  Widget: Type<Widget>;
}

export class Widget implements GridsterItem {
  id: string;
  type!: string;
  x: number = 0;
  y: number = 0;
  cols: number = 3;
  rows: number = 3;

  constructor() {
    this.id = uuidv4();
  }

  isNull(): boolean {
    return false;
  }
}
