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
  styleUrls: ['./usuario.css'],
  providers: [UserService]
})
export class UsuarioComponent implements OnInit {
  usuarios: User[] = [];

  private dialog = inject(MatDialog);
  constructor(private usuarioService: UserService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsers().subscribe(data => {
      this.usuarios = data;
    });
  }

  agregarUsuario(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        nombre: '',
        apellido: '',
        cuitEmpresa: '',
        email: ''
      }
    });

    dialogRef.afterClosed().subscribe(nuevoUsuario => {
      if (nuevoUsuario) {
        // Asignamos una contraseña por defecto ya que el formulario no la pide
        const usuarioCompleto = {
          ...nuevoUsuario,
          contrasenia: 'contrasenia123'
        };

        this.usuarioService.createUser(usuarioCompleto).subscribe(() => {
          this.cargarUsuarios();
        });
      }
    });
  }

  borrarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que quieres borrar este usuario?')) {
      this.usuarioService.deleteUser(id).subscribe(() => {
        this.cargarUsuarios();
      });
    }
  }

  editarUsuario(usuario: User): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        cuitEmpresa: usuario.cuitEmpresa
      }
    });

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
          this.cargarUsuarios();
        });
      }
    });
  }
}