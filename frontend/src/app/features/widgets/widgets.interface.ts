import { GridsterItem } from 'angular-gridster2';

export interface DashboardWidget extends GridsterItem {
  id: string;         // Уникальный ID с бэкенда
  type: string;       // Тип виджета (text, image и т.д.)
  data?: any;         // Данные виджета (текст, URL изображения и т.д.)
}
