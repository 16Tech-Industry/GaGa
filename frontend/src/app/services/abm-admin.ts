// frontend/src/app/services/abm-admin.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // URL base de la API de Django
  private apiUrl = "http://localhost:8000/api/v1";

  // Inyecta el cliente HTTP de Angular para poder hacer peticiones web.
  constructor(private http: HttpClient) {}

  // POST: Agrega un nuevo usuario
  // Omit<User, 'id'> indica que el objeto user no debe incluir la propiedad 'id' al crear.
  createUser(user: Omit<User, 'id'>): Observable<User> {
    // Apuntamos al endpoint de registro del backend
    return this.http.post<User>(`${this.apiUrl}/registro/`, user);
  }

  // GET: Obtiene todos los usuarios de la base de datos
  getUsers(): Observable<User[]> {
    // NOTA: El backend no parece tener un endpoint para listar todos los usuarios.
    // Este endpoint es un ejemplo y necesitaría ser creado en Django.
    // Por ahora, lo dejamos apuntando a un endpoint hipotético.
    return this.http.get<User[]>(`${this.apiUrl}/admin/usuarios/`);
  }

  // PUT: Actualiza un usuario existente
  updateUser(user: User): Observable<User> {
    // Construimos la URL correcta para la actualización según la API de Django
    return this.http.put<User>(`${this.apiUrl}/admin/usuarios/${user.id}/`, user);
  }

  // DELETE: Elimina un usuario del servidor
  deleteUser(id: number): Observable<any> {
    // Construimos la URL correcta para el borrado según la API de Django
    return this.http.delete(`${this.apiUrl}/admin/usuarios/${id}/`);
  }
}