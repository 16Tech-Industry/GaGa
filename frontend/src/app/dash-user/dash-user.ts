import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../components/navbar/navbar'; // Importa el componente Navbar

@Component({
  selector: 'app-dash-user',  // Selector del componente
  standalone: true,            // Componente independiente
  imports: [
    RouterModule,  // Permite usar router-outlet para renderizar rutas hijas
    Navbar         // Navbar como componente reutilizable
  ],
  templateUrl: './dash-user.html', // Template asociado
  styleUrls: ['./dash-user.css']   // Estilos asociados
})
export class DashUser {
  // Componente contenedor del dashboard del usuario
  // Renderiza Navbar + contenido principal
}
