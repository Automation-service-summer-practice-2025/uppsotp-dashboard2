import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Widget } from '../interfaces/widget.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:5062';

  constructor(private http: HttpClient) {}

  getWidgets(): Observable<Widget[]> {
    throw new Error('Method not implemented');
  }

  createWidget(widget: Widget): Observable<Widget> {
    throw new Error('Method not implemented');
  }

  updateWidget(widget: Widget): Observable<Widget> {
    throw new Error('Method not implemented');
  }

  deleteWidget(widget: Widget): Observable<Widget> {
    throw new Error('Method not implemented');
  }
}
