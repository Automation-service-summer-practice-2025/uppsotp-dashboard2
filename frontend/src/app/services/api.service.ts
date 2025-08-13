import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:5062/api';

  constructor(private http: HttpClient) {}

  // TODO: Реализовать CRUD операции для виджетов
  // TODO: Реализовать загрузку файлов для ImageWidget
}
