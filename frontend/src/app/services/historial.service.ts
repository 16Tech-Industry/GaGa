import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Interfaz con todos los campos que devuelve tu API Django
export interface Historial {
  id_metrica: number;
  fecha: string;
  temperatura: number;
  humedad: number;
  litros_consumidos: number;
  watt_consumidos: number;
}

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  // URL de tu API Django/DRF
  private apiUrl = 'http://127.0.0.1:8000/api/v1/historial/';

  constructor(private http: HttpClient) {}

  getHistorial(): Observable<Historial[]> {
    return this.http.get<Historial[]>(this.apiUrl);
    
  }
}
