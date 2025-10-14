// src/app/services/auth.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '@app/models/User';

// Interfaz que representa la estructura de un usuario
interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  contrasenia: string;
  cuitEmpresa: string;
  rol : string; // puede ser 'admin' o 'usuario'
}

// Decorador que marca este servicio como inyectable en toda la app
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "http://localhost:3000/usuarios";

  constructor(private http: HttpClient, private router: Router) {}

  // Crear usuario
  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

   //login
 login(email: string, contrasenia: string): Observable<{ success: boolean, message: string }> {
  return this.http.get<Usuario[]>(this.url).pipe(
    map(usuarios => {
      const emailClean = email.trim().toLowerCase();
      const contraseniaClean = contrasenia.trim();

      const user = usuarios.find(u =>
        u.email.trim().toLowerCase() === emailClean &&
        u.contrasenia === contraseniaClean
      );
// Si el usuario existe...
      if (user) {
        // Guardar usuario actual en localStorage
        localStorage.setItem('usuarioActual', JSON.stringify(user));

        // Redirigir según el rol
        if (user.rol === 'admin') {
          this.router.navigate(['/dash-admin']);
        } else if (user.rol === 'usuario') {
          this.router.navigate(['/dash-user']);
        } else {
          console.error('Usuario sin rol definido');
        }

        return { success: true, message: 'Login exitoso' };
      } else {
        return { success: false, message: 'Email o contraseña incorrectos' };
      }
    }),
     // Si ocurre un error de conexión con el backend
    catchError(error => {
      console.error('Error de conexión:', error);
      return of({ success: false, message: 'Error de conexión. Verifica que json-server esté corriendo.' });
    })
  );
}
 } // <-- cierra login()

