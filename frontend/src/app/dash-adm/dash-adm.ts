import { Component } from '@angular/core';
import { Nav } from './nav/nav'; // La ruta correcta es aquí

@Component({
  selector: 'app-dash-adm',
  standalone: true,
  imports: [Nav],
  templateUrl: './dash-adm.html',
  styleUrl: './dash-adm.css'
})
export class DashAdm { }  