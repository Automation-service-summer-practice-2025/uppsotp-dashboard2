import { Component } from '@angular/core';
import { LucideAngularModule, ZoomOut, ZoomIn } from 'lucide-angular';
import { ZoomService } from '../../services/zoom.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'zoom',
  standalone: true,
  imports: [LucideAngularModule, AsyncPipe],
  templateUrl: './zoom.html',
  styleUrl: './zoom.css',
})
export class Zoom {
  zoomLevel$: Observable<number>;
  zoomIncreaseIcon = ZoomIn;
  zoomDecreaseIcon = ZoomOut;

  constructor(private zoomService: ZoomService) {
    this.zoomLevel$ = this.zoomService.zoomLevel$;
  }

  zoomIn(): void {
    this.zoomService.zoomIn();
  }

  zoomOut(): void {
    this.zoomService.zoomOut();
  }
}
