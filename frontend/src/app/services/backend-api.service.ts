import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Widget } from '../interfaces/widget.interface';
import { WidgetDTO } from '../interfaces/widget-dto.interface';
import { widgetConfigs } from '../configs/widget.config';

@Injectable({
  providedIn: 'root',
})
export class BackendApiService {
  private readonly apiUrl = 'http://localhost:5062';

  constructor(private http: HttpClient) {}

  getWidgets(): Observable<Widget[]> {
    const endpoint = `${this.apiUrl}/widgets`;

    return this.http
      .get<WidgetDTO[]>(endpoint)
      .pipe(map((dtos) => dtos.map((dto) => this.dtoToWidget(dto))));
  }

  createWidget(widget: Widget): Observable<Widget> {
    const endpoint = `${this.apiUrl}/widgets`;
    const dto = this.widgetToDTO(widget);
    return this.http
      .post<WidgetDTO>(endpoint, dto)
      .pipe(map((dto) => this.dtoToWidget(dto)));
  }

  updateWidget(widget: Widget): Observable<Widget> {
    const endpoint = `${this.apiUrl}/widgets/${widget.id}`;
    const dto = this.widgetToDTO(widget);
    return this.http
      .put<WidgetDTO>(endpoint, dto)
      .pipe(map((dto) => this.dtoToWidget(dto)));
  }

  deleteWidget(widget: Widget): Observable<void> {
    const endpoint = `${this.apiUrl}/widgets/${widget.id}`;
    return this.http.delete<void>(endpoint);
  }

  private widgetToDTO(widget: Widget): WidgetDTO {
    return widget.toDTO();
  }

  private dtoToWidget(dto: WidgetDTO): Widget {
    const widget = new widgetConfigs[dto.type].Widget();
    Object.assign(widget, dto);

    return widget;
  }
}
