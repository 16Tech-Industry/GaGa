import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Metrica {
  id: number;
  temperatura: number;
  consumo: number;
}

@Injectable({
  providedIn: 'root'
})
export class MetricasService {
  private apiUrl = 'http://localhost:3000/metricas'; // JSON Server o tu API

  constructor(private http: HttpClient) {}

  // Obtener todas las métricas
  getMetricas(): Observable<Metrica[]> {
    return this.http.get<Metrica[]>(this.apiUrl);
  }

  // Obtener una métrica por ID
  getMetrica(id: number): Observable<Metrica> {
    return this.http.get<Metrica>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva métrica
  addMetrica(metrica: Metrica): Observable<Metrica> {
    return this.http.post<Metrica>(this.apiUrl, metrica);
  }

  // Actualizar métrica existente
  updateMetrica(id: number, metrica: Metrica): Observable<Metrica> {
    return this.http.put<Metrica>(`${this.apiUrl}/${id}`, metrica);
  }

  // Eliminar métrica
  deleteMetrica(id: number): Observable<Metrica> {
    return this.http.delete<Metrica>(`${this.apiUrl}/${id}`);
  }
}
