// src/app/dash-adm/usuario/usuario.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '@app/services/abm-admin';
import { User } from '@app/models/User';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '@app/dash-adm/form/form';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './usuario.html',
  styleUrls: [ '../estilos-generales.css' ],
  providers: [UserService]
})
export class UsuarioComponent implements OnInit {
  // lista que se mostrara en la vista.
  usuarios: User[] = [];
  
  // servicio para poder abrir modales.
  private dialog = inject(MatDialog);

  // inyecta el servicio de usuarios para poder hacer las operaciones CRUD
  constructor(private usuarioService: UserService) { }

  // Metodo que se ejecuta al inicializar el componente y carga los usuarios
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  // metodo que se subscribe al observable del servicio para obtener los usuarios
  cargarUsuarios(): void {
    this.usuarioService.getUsers().subscribe(data => {
      // guarda la lista en usuarios y permite la actualizacion de la vista de forma automatica
      this.usuarios = data;
    });
  }

  agregarUsuario(): void {
    // abre el modal que se llama DialogOverviewExampleDialog
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      // se pasan datos vacios al modal ya que es un nuevo usuario
      data: {
        nombre: '',
        apellido: '',
        cuitEmpresa: '',
        email: ''
      }
    });

    // se suscribe al evento de cierre de modal y obtiene los datos del nuevo usuario
    dialogRef.afterClosed().subscribe(nuevoUsuario => {
      if (nuevoUsuario) {
        // Asignamos una contraseña por defecto ya que el formulario no la pide 
        // idealmente deberia ser una contraseña generada al azar o que luego el usuario deberia cambiar
        const usuarioCompleto = {
          ...nuevoUsuario, // Copia todas las propiedades de nuevoUsuario (nombre, apellido, etc.)
          contrasenia: 'contrasenia123'
        };
        // / Llama al servicio para crear el nuevo usuario en la base de datos.
        this.usuarioService.createUser(usuarioCompleto).subscribe(() => {
          // luego de la carga exitosa del usuario recarga la lista de usuarios y la tabla
          this.cargarUsuarios();
        });
      }
    });
  }
  
  // borra usuario por id despues de confirmar la accion
  borrarUsuario(id: number): void {
    // genera un cuadro de confirmacion antes de borrar
    if (confirm('¿Estás seguro de que quieres borrar este usuario?')) {
      this.usuarioService.deleteUser(id).subscribe(() => {
        //vuelve a actualizar la lista de usuarios
        this.cargarUsuarios();
      });
    }
  }

  // edicion de usuario
  editarUsuario(usuario: User): void {
    // Abre el diálogo, pero esta vez le pasa los datos del usuario seleccionado
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { // ahora que es la edicion, se pasan los datos actuales del usuario
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        cuitEmpresa: usuario.cuitEmpresa
      }
    });
    // Se suscribe al evento de cierre del diálogo para obtener los datos actualizados
    dialogRef.afterClosed().subscribe(usuarioActualizado => {
      if (usuarioActualizado) {
        // Se crea un objeto 'usuarioCompleto' con los datos actualizados,
        // incluyendo el 'id' y 'contrasenia' del usuario original.
        const usuarioCompleto: User = {
          id: usuario.id,
          nombre: usuarioActualizado.nombre,
          apellido: usuarioActualizado.apellido,
          email: usuarioActualizado.email,
          cuitEmpresa: usuarioActualizado.cuitEmpresa,
          contrasenia: usuario.contrasenia
        };

        // Se llama al servicio para actualizar el usuario en el servidor
        this.usuarioService.updateUser(usuarioCompleto).subscribe(() => {
          // vuelve a cargar la lista de usuarios para reflejar los cambios
          this.cargarUsuarios();
        });
      }
    });
  }
}