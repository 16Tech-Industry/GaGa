import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importaciones de Material
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// Componente de la modal e interfaces
import {
  DialogCentralesComponent,
  DialogCentralesResult,
  DialogData
} from './dialog-centrales.component';

import { Centrales } from '../../models/centrales.model';
import { CentralesService } from '../../services/centrales.service';

@Component({
  selector: 'app-centrales',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './centrales.html',
  styleUrls: ['../estilos-generales.css']
})
export class CentralesComponent implements OnInit {
  private dialog = inject(MatDialog);
  private centralesService = inject(CentralesService);

  centrales = signal<Centrales[]>([]);

  ngOnInit(): void {
    this.cargarCentrales();
  }

  cargarCentrales(): void {
    this.centralesService.getCentrales().subscribe({
      next: (data) => {
        this.centrales.set(data);
      },
      error: (err) => {
        console.error('Error al cargar las centrales.', err);
      }
    });
  }

  private openCentralDialog(data: DialogData | null): void {
    const dialogRef = this.dialog.open(DialogCentralesComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe((result: DialogCentralesResult | undefined) => {
      if (!result) return;

      if (data && data.id_central) {
        // --- EDITAR ---
        const centralActualizada: Centrales = {
          id_central: data.id_central,
          n_serie: result.n_serie,
          direccion: result.direccion,
          EMPRESAS_id_empresa: result.EMPRESAS_id_empresa,
          fecha_carga: new Date()
        };
        
        // << NUEVO >> Log para ver qué se envía al actualizar
        console.log('Enviando para actualizar:', centralActualizada);

        this.centralesService.updateCentral(centralActualizada).subscribe({
          next: () => this.cargarCentrales(),
          error: (err) => console.error('Error al actualizar la central', err)
        });
      } else {
        // --- CREAR ---
        const nuevaCentral: Partial<Centrales> = {
          n_serie: result.n_serie,
          direccion: result.direccion,
          EMPRESAS_id_empresa: result.EMPRESAS_id_empresa
        };

        // << NUEVO >> Log para ver qué se envía al crear
        console.log('Enviando para crear:', nuevaCentral);

        this.centralesService.createCentral(nuevaCentral).subscribe({
          next: () => this.cargarCentrales(),
          error: (err) => console.error('Error al crear la central', err)
        });
      }
    });
  }

  agregarCentral(): void {
    this.openCentralDialog(null);
  }

  editarCentral(central: Centrales): void {
    const dialogData: DialogData = {
      id_central: central.id_central,
      n_serie: central.n_serie,
      direccion: central.direccion,
      EMPRESAS_id_empresa: central.EMPRESAS_id_empresa
    };
    this.openCentralDialog(dialogData);
  }

  borrarCentral(central: Centrales): void {
    if (confirm(`¿Está seguro de que desea borrar la central N/S: ${central.n_serie}?`)) {
      this.centralesService.deleteCentral(central.id_central).subscribe({
        next: () => this.cargarCentrales(),
        error: (err) => console.error('Error al eliminar la central', err)
      });
    }
  }
}

