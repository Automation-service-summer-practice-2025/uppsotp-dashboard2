import { Editor } from 'ngx-editor';
import { Widget } from './widget.interface';

export class TextWidget extends Widget {
  override type: string = 'text';
  htmlContent: string = '';
  editor: Editor = new Editor();
}

export class ImageWidget extends Widget {
  override type: string = 'image';

  file?: File | null = null;
  previewUrl?: string | null = null;
}
