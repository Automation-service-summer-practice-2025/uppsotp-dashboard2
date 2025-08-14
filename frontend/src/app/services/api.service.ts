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
    const endpoint = `${this.apiUrl}/widgets`;
    return this.http.get<Widget[]>(endpoint);
  }

  createWidget(widget: Widget): Observable<Widget> {
    const endpoint = `${this.apiUrl}/widgets`;
    return this.http.post<Widget>(endpoint, widget);
  }

  updateWidget(widget: Widget): Observable<Widget> {
    const endpoint = `${this.apiUrl}/widgets/${widget.id}`;
    return this.http.put<Widget>(endpoint, widget);
  }

  deleteWidget(widget: Widget): Observable<void> {
    const endpoint = `${this.apiUrl}/widgets/${widget.id}`;
    return this.http.delete<void>(endpoint);
  }
}
