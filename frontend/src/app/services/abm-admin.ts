import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:3000/usuarios";

  constructor(private http: HttpClient) {}

  // POST: Agrega un nuevo usuario al servidor
  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  // GET: Obtiene todos los usuarios del servidor
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  // DELETE: Elimina un usuario del servidor
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}