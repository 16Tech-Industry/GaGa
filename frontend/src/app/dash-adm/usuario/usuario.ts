// src/app/usuario/usuario.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngFor
import { AuthService } from '@app/services/auth'; // Asegúrate de que la ruta sea correcta
import { AbmAdminService } from '@app/services/abm-admin';


@Component({
  selector: 'app-usuario',
  standalone: true, // Esto es correcto para componentes independientes
  imports: [CommonModule], // Necesario para directivas como *ngFor
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class UsuarioComponent { 
  usuarios: any;
  constructor(private obtenerUsuarios: AbmAdminService) {

    this.usuarios=obtenerUsuarios.obtenerUsuarios().subscribe(
      {next:()=>{ this.usuarios= this.usuarios; },
      error:(e)=>console.error(e),
      complete:()=>console.info(this.usuarios)
    });
  }
}

