import { v4 as uuidv4 } from 'uuid';
import {
  Widget,
  TextWidget,
  ImageWidget,
} from '../interfaces/widget.interface';

type WidgetFactory = () => Widget;

export const widgetFactories: Record<string, WidgetFactory> = {
  text: (): TextWidget => ({
    id: uuidv4(),
    type: 'text',
    cols: 3,
    rows: 3,
    x: 0,
    y: 0,
    textParamA: 'default',
    textParamB: 0,
  }),
  image: (): ImageWidget => ({
    id: uuidv4(),
    type: 'image',
    cols: 3,
    rows: 3,
    x: 0,
    y: 0,
    imageParamA: 'default',
    imageParamB: 0,
  }),
};
