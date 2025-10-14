// frontend/src/app/services/abm-admin.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // url de conexion a servidor
  url = "http://localhost:3000/usuarios";

  // Inyecta el cliente HTTP de Angular para poder hacer peticiones web.
  constructor(private http: HttpClient) {}

  // POST: Agrega un nuevo usuario
  // El omit<User, 'id'> indica que el objeto user no debe incluir la propiedad 'id' al crear un nuevo usuario.
  // teniendo en cuenta que este ultimo es incremental y se añade automaticamente en el backend
  createUser(user: Omit<User, 'id'>): Observable<User> {
    // el return es un observable que emite un "aviso" que el usuario fue creado
    return this.http.post<User>(this.url, user);
  }

  // GET: Obtiene todos los usuarios de la base de datos
  getUsers(): Observable<User[]> {
    // el return es un observable que emite un array de usuarios
    return this.http.get<User[]>(this.url);
  }

  // PUT: Actualiza un usuario existente
  updateUser(user: User): Observable<User> {
    // se "construye" una url para la actualizacion del usuario en la base de datos.
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  // DELETE: Elimina un usuario del servidor
  deleteUser(id: number): Observable<any> {
    // se "construye" una url para la eliminacion del usuario en la base de datos.
    return this.http.delete(`${this.url}/${id}`);
  }
}