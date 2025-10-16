import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Centrales } from '../models/centrales.model';

@Injectable({
  providedIn: 'root'
})
export class CentralesService {
  private apiUrl = 'http://localhost:8000/api/v1/admin/centrales/';
  private http = inject(HttpClient);

  getCentrales(): Observable<Centrales[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(response => response.map(item => ({
        ...item,
        fecha_carga: new Date(item.fecha_carga)
      })))
    );
  }

  createCentral(central: Partial<Centrales>): Observable<Centrales> {
    // << CORRECCIÓN >>: Creamos un payload que coincida con el formulario de Django.
    const payload = {
      n_serie: central.n_serie,
      direccion: central.direccion,
      // Renombramos 'EMPRESAS_id_empresa' a 'empresa' para el backend.
      empresa: central.EMPRESAS_id_empresa
    };
    return this.http.post<Centrales>(this.apiUrl, payload);
  }

  updateCentral(central: Centrales): Observable<Centrales> {
    const url = `${this.apiUrl}${central.id_central}/`;
    // << CORRECCIÓN >>: También ajustamos el payload para la actualización.
     const payload = {
      id_central: central.id_central,
      n_serie: central.n_serie,
      direccion: central.direccion,
      empresa: central.EMPRESAS_id_empresa
    };
    return this.http.put<Centrales>(url, payload);
  }

  deleteCentral(id: number): Observable<void> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.delete<void>(url);
  }
}

