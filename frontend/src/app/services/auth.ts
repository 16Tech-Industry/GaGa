// src/app/services/auth.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/models/User';
import { Router } from '@angular/router';
import { map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';


interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  contrasenia: string;
  cuitEmpresa: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "http://localhost:3000/usuarios";

  constructor(private http: HttpClient,
              private router: Router
  ) {}

  // Corregido: Ahora el método acepta un objeto sin la propiedad 'id'
  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
  
  login(email: string, contrasenia: string): Observable<{ success: boolean, message: string }> {
    return this.http.get<User[]>(this.url).pipe(
      map(usuarios => {
        // Buscar usuario con email y password coincidentes
        const user = usuarios.find(u => u.email === email && u.contrasenia === contrasenia);
        
        if (user) {
          // Login exitoso - redirigir a dashboard
          this.router.navigate(['/dash-admin']);
          return { success: true, message: 'Login exitoso' };
        } else {
          // Credenciales incorrectas
          return { success: false, message: 'Email o contraseña incorrectos' };
        }
      }),
      catchError(error => {
        // Error de conexión
        console.error('Error:', error);
        return of({ success: false, message: 'Error de conexión. Verifica que json-server esté ejecutándose.' });
      })
    );
  }
}
