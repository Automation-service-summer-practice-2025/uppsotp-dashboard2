import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  private zoomLevelCurrent = new BehaviorSubject<number>(100);

  zoomLevel$: Observable<number> = this.zoomLevelCurrent.asObservable();

  get zoomLevel(): number {
    return this.zoomLevelCurrent.value;
  }

  setZoomLevel(level: number): void {
    if (level < 50) level = 50;
    if (level > 200) level = 200;

    this.zoomLevelCurrent.next(level);
  }

  zoomIn(step: number = 10): void {
    this.setZoomLevel(this.zoomLevel + step);
  }

  zoomOut(step: number = 10): void {
    this.setZoomLevel(this.zoomLevel - step);
  }
}
