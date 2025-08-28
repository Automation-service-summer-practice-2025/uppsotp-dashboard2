import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
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
    if (!env.enableBackendApi) {
      return of([]);
    }

    const endpoint = `${env.backendApiUrl}/widgets`;

    return this.http
      .get<WidgetDTO[]>(endpoint)
      .pipe(map((dtos) => dtos.map((dto) => this.dtoToWidget(dto))));
  }

  createWidget(widget: Widget): Observable<void> {
    if (!env.enableBackendApi) {
      return of(undefined);
    }

    const endpoint = `${env.backendApiUrl}/widgets`;
    const dto = widget.toDTO();

    return this.http.post<void>(endpoint, dto);
  }

  updateWidget(widget: Widget): Observable<void> {
    if (!env.enableBackendApi) {
      return of(undefined);
    }

    const endpoint = `${env.backendApiUrl}/widgets/${widget.id}`;
    const dto = widget.toDTO();

    return this.http.put<void>(endpoint, dto);
  }

  deleteWidget(widget: Widget): Observable<void> {
    if (!env.enableBackendApi) {
      return of(undefined);
    }

    const endpoint = `${env.backendApiUrl}/widgets/${widget.id}`;

    return this.http.delete<void>(endpoint);
  }

  private dtoToWidget(dto: WidgetDTO): Widget {
    const widget = new widgetConfigs[dto.Type].Widget();

    widget.copyDataFromDTO(dto);

    return widget;
  }
}
