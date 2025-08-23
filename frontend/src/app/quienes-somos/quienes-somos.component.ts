import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
// Rutas corregidas si header y footer están DENTRO de quienes-somos
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './quienes-somos.html', 
  styleUrl: './quienes-somos.css'
})
export class QuienesSomosComponent { 

}