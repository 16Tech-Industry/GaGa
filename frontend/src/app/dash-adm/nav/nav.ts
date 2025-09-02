// src/app/dash-adm/nav/nav.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule], // Añádelo aquí
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  isOpen: boolean = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}