// src/app/usuario/usuario.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngFor

// 1. Define la estructura de un usuario (Interface)
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  empresa: string;
}

@Component({
  selector: 'app-usuario',
  standalone: true, // Esto es correcto para componentes independientes
  imports: [CommonModule], // Necesario para directivas como *ngFor
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class UsuarioComponent { // Cambié el nombre de la clase a UsuarioComponent (convención)
  // 2. Array de datos de ejemplo (Data)
  usuarios: Usuario[] = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com', empresa: 'FullAnito'},
    { id: 2, nombre: 'María García', email: 'maria.garcia@example.com', empresa: 'FullAnito'},
    { id: 3, nombre: 'Carlos Rodríguez', email: 'carlos.rodriguez@example.com', empresa: 'FullAnito'},
    { id: 4, nombre: 'Esteban Quito', email: 'esteban.quito@example.com', empresa: 'FullAnito'},
  ];
}