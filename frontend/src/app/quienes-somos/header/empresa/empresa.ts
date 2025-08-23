import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
export interface Empresas {
  id: number;
  email: string;
  empresa: string;
}
@Component({
  selector: 'app-empresa',
  imports: [CommonModule],
  templateUrl: './empresa.html',
  styleUrls: ['./empresa.css']
})
export class EmpresaComponent {
  Empresas: Empresas[] = [
      { id: 1, email: 'Unitedhealth@example.com', empresa: 'Unitedhealth'}, 
      { id: 2, email: 'Alphabet-A@example.com', empresa: 'Alphabet-A'},
      { id: 3, email: 'carlos.rodriguez@example.com', empresa: 'Samsung'},
      { id: 4, email: 'Mckesson@example.com', empresa: 'Mckesson'},
    ];
}
