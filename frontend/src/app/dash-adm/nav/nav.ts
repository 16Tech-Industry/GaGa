import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  isOpen: boolean = false; // Declara la propiedad 'isOpen'

  toggleSidebar() {
    this.isOpen = !this.isOpen; // Método para cambiar su valor
  }
}