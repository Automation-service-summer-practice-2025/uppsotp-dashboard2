import {
  Minus,
  Plus,
  StretchVertical,
  StretchHorizontal,
} from 'lucide-angular';
import { TableEditorBtn } from '../interfaces/table-editor-btn.interface';

export const getTableEditorButtons = (context: {
  addColumn: () => void;
  removeColumn: () => void;
  addRow: () => void;
  removeRow: () => void;
}): TableEditorBtn[] => [
  {
    label: 'Добавить колонку',
    func: () => context.addColumn(),
    icon: [Plus, StretchVertical],
  },
  {
    label: 'Удалить колонку',
    func: () => context.removeColumn(),
    icon: [Minus, StretchVertical],
  },
  {
    label: 'Добавить строку',
    func: () => context.addRow(),
    icon: [Plus, StretchHorizontal],
  },
  {
    label: 'Удалить строку',
    func: () => context.removeRow(),
    icon: [Minus, StretchHorizontal],
  },
];
