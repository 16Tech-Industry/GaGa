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

  // POST: Agrega un nuevo usuario
  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  // GET: Obtiene todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  // DELETE: Elimina un usuario del servidor
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }


}