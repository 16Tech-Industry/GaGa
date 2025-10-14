// centrales.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Centrales } from '../models/centrales.model';

// Interfaz para mapear los datos que vienen del servidor (db.json)
// Se usa cuando los nombres de los campos en el backend no coinciden con los del modelo en Angular.
interface CentralesBackend {
  id: string;
  nombre: string;
  direccion: string; // db.json usa 'direccion' en lugar de 'Ubicacion'
  empresaId: string; // db.json usa 'empresaId' en lugar de 'empresa'
}

@Injectable({
  providedIn: 'root'// Permite inyectar este servicio globalmente en toda la app
})
export class CentralesService {
 // URL base del endpoint donde se encuentra la API REST (JSON Server en este caso)
  // Si el servidor corre en otro puerto, hay que actualizar esta ruta.
  private apiUrl = 'http://localhost:3000/centrales';
  private http = inject(HttpClient);   // Inyección del servicio HttpClient para realizar las peticiones HTTP

 // === MÉTODOS CRUD (Create, Read, Update, Delete) ===
  // READ: Obtener todos los registros al iniciar la aplicación
   // Retorna un Observable con un array de objetos que siguen la estructura de 'CentralesBackend'.
  getCentrales(): Observable<CentralesBackend[]> {
    return this.http.get<CentralesBackend[]>(this.apiUrl);
  }

  // CREATE: Enviar nuevos datos al servidor
   // Se usa Partial<Centrales> porque no todos los campos (como 'id') son necesarios al crear.
  createCentral(central: Partial<Centrales>): Observable<CentralesBackend> {
    const payload = {
      nombre: central.nombre,
      direccion: central.Ubicacion, // Mapeo de Angular (Ubicacion) a Backend (direccion)
      empresaId: central.empresa // Mapeo de Angular (empresa) a Backend (empresaId)
    };
    return this.http.post<CentralesBackend>(this.apiUrl, payload);
  } // Envía los datos actualizados mediante una petición PUT

  // UPDATE: Actualizar un registro existente
  updateCentral(central: Centrales): Observable<CentralesBackend> {
    const url = `${this.apiUrl}/${central.id}`; // Construye la URL incluyendo el ID de la central a actualizar
    const payload = {
      nombre: central.nombre,
      direccion: central.Ubicacion,
      empresaId: central.empresa
    };
    return this.http.put<CentralesBackend>(url, payload);
  }

  // DELETE: Eliminar un registro
    // No devuelve datos, solo confirma la eliminación (por eso se usa Observable<void>)
  deleteCentral(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`; // Construye la URL específica de la central a eliminar
    return this.http.delete<void>(url);// Realiza la petición DELETE al backend
  }
}
