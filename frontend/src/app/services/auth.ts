// src/app/services/auth.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "http://localhost:3000/usuarios";

  constructor(private http: HttpClient) {}

  // Corregido: Ahora el método acepta un objeto sin la propiedad 'id'
  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
}