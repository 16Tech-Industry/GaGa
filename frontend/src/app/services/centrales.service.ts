// centrales.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Centrales } from '../models/centrales.model';

// Interfaz para mapear los datos que vienen del servidor (db.json)
// Asegúrate de que esta interfaz refleje la estructura de tu backend si es diferente a Centrales
interface CentralesBackend {
  id: string;
  nombre: string;
  direccion: string; // db.json usa 'direccion' en lugar de 'Ubicacion'
  empresaId: string; // db.json usa 'empresaId' en lugar de 'empresa'
}

@Injectable({
  providedIn: 'root'
})
export class CentralesService {
  // Ajusta esta URL si tu servidor se ejecuta en otro puerto
  private apiUrl = 'http://localhost:3000/centrales';
  private http = inject(HttpClient);

  // READ: Obtener todos los registros al iniciar la aplicación
  getCentrales(): Observable<CentralesBackend[]> {
    return this.http.get<CentralesBackend[]>(this.apiUrl);
  }

  // CREATE: Enviar nuevos datos al servidor
  createCentral(central: Partial<Centrales>): Observable<CentralesBackend> {
    const payload = {
      nombre: central.nombre,
      direccion: central.Ubicacion, // Mapeo de Angular (Ubicacion) a Backend (direccion)
      empresaId: central.empresa // Mapeo de Angular (empresa) a Backend (empresaId)
    };
    return this.http.post<CentralesBackend>(this.apiUrl, payload);
  }

  // UPDATE: Actualizar un registro existente
  updateCentral(central: Centrales): Observable<CentralesBackend> {
    const url = `${this.apiUrl}/${central.id}`;
    const payload = {
      nombre: central.nombre,
      direccion: central.Ubicacion,
      empresaId: central.empresa
    };
    return this.http.put<CentralesBackend>(url, payload);
  }

  // DELETE: Eliminar un registro
  deleteCentral(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
