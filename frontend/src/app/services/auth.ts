// src/app/services/auth.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap} from 'rxjs/operators';
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

interface LoginResponse {
  mensaje: string;
  rol: string;
}

// Decorador que marca este servicio como inyectable en toda la app
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
  url_registro = "http://localhost:8000/api/v1/registro/";
  url_login = "http://localhost:8000/api/v1/login/";

  constructor(private http: HttpClient, private router: Router) {} //Inyecta el servicio HttpClient de Angular para hacer solicitudes HTTP.

  // Crear usuario
  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.url_registro, user);
     // Realiza una solicitud POST a usuarios enviando los datos del nuevo usuario
  }

   //login

  login(email: string, password: string): Observable<{ success: boolean; message: string }> {
    const credentials = { email, password };
    console.log('Enviando estas credenciales al backend:', credentials);
    return this.http.post<LoginResponse>(this.url_login, credentials).pipe(
      tap(response => {
        // Si el login es exitoso, solo se ejecuta la redirección.
        this.handleRedirect(response.rol);
      }),
      map(response => {
        // Se devuelve un mensaje de éxito al componente que llamó al método.
        return { success: true, message: response.mensaje };
      }),
      catchError((error: HttpErrorResponse) => {
        // Si django devuelve un error inesperado, se maneja aquí.
        let errorMessage = 'Error de conexión. Inténtalo de nuevo.';
        
        if (error.status === 400 || error.status === 404) {
          errorMessage = error.error?.detail || 'Email o contraseña incorrectos';
        }
        
        console.error('Error en el login:', error);
        return of({ success: false, message: errorMessage });
      })
    );
  }

  /**
   * Método privado para manejar la redireccion segun el rol del usuario.
   * @param rol El rol del usuario ('admin', 'usuario', etc.).
   */
  private handleRedirect(rol: string): void {
    if (rol === 'admin') {
      this.router.navigate(['/dash-admin']);
    } else if (rol === 'usuario') {
      this.router.navigate(['/dash-user']);
    } else {
      console.error('Rol de usuario no reconocido:', rol);
      this.router.navigate(['/']);
    }
  }// <-- cierra login()
}



