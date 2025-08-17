import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // 1. Importa RouterOutlet
import { Nav } from './nav/nav'; // La ruta correcta es aquí

@Component({
  selector: 'app-dash-adm',
  standalone: true,
  imports: [RouterOutlet, Nav],
  templateUrl: './dash-adm.html',
  styleUrl: './dash-adm.css'
})
export class DashAdm { }  
