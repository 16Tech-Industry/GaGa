import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Nueva interfaz para reflejar los campos reales del modelo Django
export interface Metrica {
  id_metrica: number;
  fecha: string;
  temperatura: number;
  humedad: number;
  viento: number;
  litros_consumidos: number;
  watt_consumidos: number;
  centrales_id_central: number;
}

@Injectable({
  providedIn: 'root'
})
export class MetricasService {
  // Nueva URL que apunta a tu API Django (DRF)
  private apiUrl = 'http://127.0.0.1:8000/api/v1/metricas/';

  constructor(private http: HttpClient) {}

  // Obtener todas las métricas desde Django/Postgres
  getMetricas(): Observable<Metrica[]> {
    return this.http.get<Metrica[]>(this.apiUrl);
  }

  // Obtener una métrica específica (opcional)
  getMetrica(id: number): Observable<Metrica> {
    return this.http.get<Metrica>(`${this.apiUrl}${id}/`);
  }
}