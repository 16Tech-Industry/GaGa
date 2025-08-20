import { Component } from '@angular/core';

@Component({
  selector: 'app-quienes-somos',
  standalone: true, // Agrega esta línea para marcarlo como standalone
  imports: [], // El array de imports está vacío, lo cual es correcto
  templateUrl: './quienes-somos.html',
  styleUrl: './quienes-somos.css'
})
export class QuienesSomosComponent { // Cambia el nombre de la clase para que coincida con el import
}