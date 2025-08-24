// En tu archivo header.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './header.component.html', // Corregido
  styleUrl: './header.component.css' // Corregido
})
export class HeaderComponent {
  // Asegúrate de que la clase también se llame HeaderComponent
}