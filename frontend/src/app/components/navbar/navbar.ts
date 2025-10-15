import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',               // Nombre del componente para usar en HTML
  standalone: true,                     // Componente independiente (no necesita NgModule)
  imports: [CommonModule, RouterLink, RouterLinkActive], // Dependencias necesarias
  templateUrl: './navbar.html',         // Template asociado
  styleUrls: ['./navbar.css']           // Estilos asociados
})
export class Navbar {
  // Variable que indica si el menú está abierto o cerrado
  isOpen = false;

  // Función que invierte el estado del menú
  // Si está cerrado -> se abre / Si está abierto -> se cierra
  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

  // Función que cierra el menú de forma explícita
  // Se usa al hacer click en un enlace
  closeNavbar() {
    this.isOpen = false;
  }
}
