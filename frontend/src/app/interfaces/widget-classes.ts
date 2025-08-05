import { Widget } from './widget.interface';

export class TextWidget extends Widget {
  override type: string = 'text';
  htmlContent: string = '';
}

export class ImageWidget extends Widget {
  override type: string = 'image';
  mockParam1: string = 'this is image.mockParam1';
}
