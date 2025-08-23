// En tu archivo header.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html', // Corregido
  styleUrl: './header.component.css' // Corregido
})
export class HeaderComponent {
  // Asegúrate de que la clase también se llame HeaderComponent
}