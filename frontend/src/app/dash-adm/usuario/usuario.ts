// src/app/dash-adm/usuario/usuario.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '@app/services/abm-admin'; // Asegúrate de que la ruta sea correcta
import { User } from '@app/models/User';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.css'],
  providers: [UserService]
})
export class UsuarioComponent implements OnInit {
  usuarios: User[] = [];

  constructor(private usuarioService: UserService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsers().subscribe(data => {
      this.usuarios = data;
      console.log('Usuarios cargados:', this.usuarios);
    });
  }

  agregarUsuario(): void {
    const nuevoUsuario: Omit<User, 'id'> = {
      nombre: 'Nuevo',
      apellido: 'Usuario',
      cuitEmpresa: '30-12345678-9',
      email: 'nuevo@example.com',
      contrasenia: 'contrasenia123',
    };
    this.usuarioService.createUser(nuevoUsuario).subscribe(() => {
      this.cargarUsuarios();
    });
  }

}
