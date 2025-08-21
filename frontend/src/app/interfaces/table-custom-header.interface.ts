import { IHeaderParams } from 'ag-grid-community';
import { TableWidget } from './widget-classes';

export interface CustomHeaderParams extends IHeaderParams {
  widget?: TableWidget;
}
