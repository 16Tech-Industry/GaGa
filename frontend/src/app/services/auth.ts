// src/app/services/auth.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/models/User';

/** PARA EL FORMULARIO DE REGISTRO
 * Servicio de autenticación (AuthService)
 * Este servicio se encarga de gestionar todas las operaciones relacionadas
 * con usuarios y autenticación frente al backend (por ahora, solo el registro).
 * Se declara con `providedIn: 'root'` para que esté disponible en toda la aplicación
 * sin necesidad de importar explícitamente el servicio en otros módulos.*/

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** URL base de la API donde se almacenan los usuarios.
   * En este caso, apunta a un backend local JSON Server.*/
  url = "http://localhost:8000/api/v1/registro/";

  constructor(private http: HttpClient) {} //Inyecta el servicio HttpClient de Angular para hacer solicitudes HTTP.

  // Corregido: Ahora el método acepta un objeto sin la propiedad 'id'
  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.url, user);
     // Realiza una solicitud POST a usuarios enviando los datos del nuevo usuario
  }
}
