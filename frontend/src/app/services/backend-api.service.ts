import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, throwError, of } from 'rxjs';
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
      catchError((error) => {
        if (env.showApiErrors) {
          return throwError(() => error);
        }
        return of([]);
      })
    );
  }

  createWidget(widget: Widget): Observable<void> {
    const endpoint = `${env.backendApiUrl}/widgets`;
    const dto = widget.toDTO();

    return this.http.post<void>(endpoint, dto).pipe(
      catchError((error) => {
        if (env.showApiErrors) {
          return throwError(() => error);
        }
        return of(undefined);
      })
    );
  }

  updateWidget(widget: Widget): Observable<void> {
    const endpoint = `${env.backendApiUrl}/widgets/${widget.id}`;
    const dto = widget.toDTO();

    return this.http.put<void>(endpoint, dto).pipe(
      catchError((error) => {
        if (env.showApiErrors) {
          return throwError(() => error);
        }
        return of(undefined);
      })
    );
  }

  deleteWidget(widget: Widget): Observable<void> {
    const endpoint = `${env.backendApiUrl}/widgets/${widget.id}`;

    return this.http.delete<void>(endpoint).pipe(
      catchError((error) => {
        if (env.showApiErrors) {
          return throwError(() => error);
        }
        return of(undefined);
      })
    );
  }

  private dtoToWidget(dto: WidgetDTO): Widget {
    const widget = new widgetConfigs[dto.type].Widget();
    Object.assign(widget, dto);

    return widget;
  }
}
