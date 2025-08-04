import { Widget } from './widget.interface';

export class TextWidget extends Widget {
  override type: string = 'text';
  mockParam1: string = 'this is text.mockParam1';
}

export class ImageWidget extends Widget {
  override type: string = 'image';
  mockParam1: string = 'this is image.mockParam1';
}
