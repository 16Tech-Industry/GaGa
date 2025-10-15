// src/app/dash-adm/usuario/usuario.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/abm-admin'; // Ruta corregida
import { User } from '../../models/User'; // Ruta corregida
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../form/form'; // Asume que este es el modal
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
  
  private dialog = inject(MatDialog);
  constructor(private usuarioService: UserService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    // Usa el nuevo endpoint GET: /api/admin/usuarios/
    this.usuarioService.getUsers().subscribe(data => {
      this.usuarios = data;
      console.log(this.usuarios)
    });
  }

  agregarUsuario(): void {
    // ... (El código de agregarUsuario sigue igual si usa el POST a /admin/usuario/)
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        nombre: '',
        apellido: '',
        cuit_empresa: '',
        email: ''
      }
    });

    dialogRef.afterClosed().subscribe(nuevoUsuario => {
      if (nuevoUsuario) {
        const usuarioCompleto = {
          ...nuevoUsuario,
          contrasenia: 'Contra123!',
          rol: 'usuario'
        } as User; // Se asegura que sea de tipo User
        console.log(usuarioCompleto)
        this.usuarioService.createUser(usuarioCompleto).subscribe(() => {
          this.cargarUsuarios();
        });
      }
    });
  }
  
  borrarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que quieres borrar este usuario?')) {
      // Usa el nuevo endpoint DELETE: /api/admin/usuario/{id}/
      this.usuarioService.deleteUser(id).subscribe(() => {
        this.cargarUsuarios();
      });
    }
  }

  // Lógica de edición actualizada
  editarUsuario(usuario: User): void {
    // Abre el diálogo con los datos actuales
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { 
        id: usuario.id, // Es VITAL pasar el ID al modal para que se devuelva
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        cuit_empresa: usuario.cuit_empresa
      }
    });

    dialogRef.afterClosed().subscribe(usuarioActualizado => {
      if (usuarioActualizado) {
        // Se crea un objeto 'usuarioCompleto' con los datos actualizados
        const usuarioCompleto: User = {
          // Usa el ID original y el resto de datos del formulario/usuario original
          id: usuario.id, 
          nombre: usuarioActualizado.nombre,
          apellido: usuarioActualizado.apellido,
          email: usuarioActualizado.email,
          cuit_empresa: usuarioActualizado.cuit_empresa,
          contrasenia: usuario.contrasenia, // Mantiene la contraseña original
          rol: usuario.rol // Mantiene el rol original
        };

        // Llama al servicio con el método PUT
        this.usuarioService.updateUser(usuarioCompleto).subscribe(() => {
          this.cargarUsuarios(); // Recarga la lista para reflejar los cambios
        });
      }
    });
  }
}
