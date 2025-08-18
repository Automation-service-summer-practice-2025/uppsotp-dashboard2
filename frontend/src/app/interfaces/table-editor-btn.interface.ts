import { LucideIconData } from 'lucide-angular';

export interface TableEditorBtn {
  label: string;
  func: () => void;
  icon: [LucideIconData, LucideIconData];
}
