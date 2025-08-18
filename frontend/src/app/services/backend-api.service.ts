import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap, catchError, throwError } from 'rxjs';
import { Widget } from '../interfaces/widget.interface';
import { WidgetDTO } from '../interfaces/widget-dto.interface';
import { widgetConfigs } from '../configs/widget.config';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  constructor(private http: HttpClient) {}

  getWidgets(): Observable<Widget[]> {
    const endpoint = `${env.backendApiUrl}/widgets`;

    return this.http.get<WidgetDTO[]>(endpoint).pipe(
      map((dtos) => dtos.map((dto) => this.dtoToWidget(dto))),
      tap(() => console.info('Successfully fetched widgets')),
      catchError((error) => {
        console.error('Error reading widgets:', error);
        return throwError(() => error);
      })
    );
  }

  createWidget(widget: Widget): Observable<void> {
    const endpoint = `${env.backendApiUrl}/widgets`;
    const dto = widget.toDTO();

    return this.http.post<void>(endpoint, dto).pipe(
      tap(() => console.info('Successfully saved widget')),
      catchError((error) => {
        console.error('Error creating widget:', error);
        return throwError(() => error);
      })
    );
  }

  updateWidget(widget: Widget): Observable<void> {
    const endpoint = `${env.backendApiUrl}/widgets/${widget.id}`;
    const dto = widget.toDTO();

    return this.http.put<void>(endpoint, dto).pipe(
      tap(() => console.info('Successfully saved widget changes')),
      catchError((error) => {
        console.error('Error updating widget:', error);
        return throwError(() => error);
      })
    );
  }

  deleteWidget(widget: Widget): Observable<void> {
    const endpoint = `${env.backendApiUrl}/widgets/${widget.id}`;

    return this.http.delete<void>(endpoint).pipe(
      tap(() => console.info('Successfully deleted widget')),
      catchError((error) => {
        console.error('Error deleting widget:', error);
        return throwError(() => error);
      })
    );
  }

  private dtoToWidget(dto: WidgetDTO): Widget {
    const widget = new widgetConfigs[dto.type].Widget();
    Object.assign(widget, dto);

    return widget;
  }
}
