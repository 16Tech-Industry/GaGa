import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
export interface Centrales {
  id: number;
  Ubicacion: string;
  empresa: string;
}
@Component({
  selector: 'app-centrales',
  imports: [CommonModule],
  templateUrl: './centrales.html',
  styleUrls: ['../estilos-generales.css']
})
export class CentralesComponent {
  Centrales: Centrales[] = [
        { id: 1, Ubicacion: 'Empire State Building  34th Street - Estados Unidos', empresa: 'Ardu'},
        { id: 2, Ubicacion: 'Charing Cross Road - Reino Unido', empresa: 'Fiat'},
        { id: 3, Ubicacion: 'Greater London - Reino Unido', empresa: 'Samsung'},
        { id: 4, Ubicacion: 'Texas State Capitol, 1100 Congress Ave - Estados Unidos', empresa: 'Walmart'},
      ];
}
