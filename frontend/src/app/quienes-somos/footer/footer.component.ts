// Archivo: footer.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar esto si es necesario

@Component({
  selector: 'app-footer',
  standalone: true, // Agrega esta línea para que el componente sea autónomo
  imports: [CommonModule], // El array de imports debe tener los módulos necesarios
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent { // Cambia el nombre de la clase
  // Aquí va la lógica de tu componente
}