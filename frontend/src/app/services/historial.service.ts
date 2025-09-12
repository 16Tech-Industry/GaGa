import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Historial {
  id: number;
  fecha: string;
  temperatura: number;
  humedad: number;
  consumo: number;
  ahorro: number;
}

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private apiUrl = 'http://localhost:3000/historial';

  constructor(private http: HttpClient) {}

  getHistorial(): Observable<Historial[]> {
    return this.http.get<Historial[]>(this.apiUrl);
  }
}
