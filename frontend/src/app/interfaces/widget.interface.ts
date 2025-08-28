import { Type } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { v4 as uuidv4 } from 'uuid';
import { WidgetDTO } from './widget-dto.interface';

export interface WidgetConfig {
  Component: Type<any>;
  Editor: Type<any>;
  Widget: Type<Widget>;
}

export abstract class Widget implements GridsterItem {
  id: string;
  type!: string;
  x: number = 0;
  y: number = 0;
  cols: number = 3;
  rows: number = 3;

  constructor() {
    this.id = uuidv4();
  }

  abstract toDTO(): WidgetDTO;

  abstract copyDataFromDTO(dto: WidgetDTO): void;
}
