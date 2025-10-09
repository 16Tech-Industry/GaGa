import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importaciones de Material
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// Componente del Diálogo e interfaces
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
  styleUrls: ['./centrales.css']
})
export class CentralesComponent implements OnInit {

  private dialog = inject(MatDialog);
  private centralesService = inject(CentralesService);

  centrales = signal<Centrales[]>([]);

  // Carga los datos al iniciar el componente
  ngOnInit(): void {
    this.cargarCentrales();
  }

  // Obtiene los datos del backend (db.json)
  cargarCentrales(): void {
    this.centralesService.getCentrales().subscribe({
      next: (data: any) => {
        // Mapea los campos del backend (direccion, empresaId) al formato de Angular (Ubicacion, empresa)
        const mappedData = data.map((c: any) => ({
          id: c.id,
          nombre: c.nombre,
          Ubicacion: c.direccion,
          empresa: c.empresaId
        }));
        this.centrales.set(mappedData);
      },
      error: (err) => {
        console.error('Error al cargar las centrales. Verifica que JSON Server esté corriendo.', err);
      }
    });
  }

  private openCentralDialog(data: DialogData | null): void {
    const dialogRef = this.dialog.open(DialogCentralesComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe((result: DialogCentralesResult | undefined) => {
      if (result) {
        if (data && data.id) {
          // Caso EDITAR (UPDATE)
          const centralEditada: Centrales = {
            id: data.id,
            nombre: result.nombre,
            Ubicacion: result.Ubicacion,
            empresa: result.empresa,
          };

          this.centralesService.updateCentral(centralEditada).subscribe({
            next: () => {
              this.centrales.update(currentCentrales =>
                currentCentrales.map(c => c.id === centralEditada.id ? centralEditada : c)
              );
              console.log('Central editada y guardada en BD:', centralEditada);
            },
            error: (err) => console.error('Error al editar la central en el servidor', err)
          });

        } else {
          // Caso AGREGAR (CREATE)
          const nuevaCentral: Partial<Centrales> = {
            nombre: result.nombre,
            Ubicacion: result.Ubicacion,
            empresa: result.empresa,
          };

          this.centralesService.createCentral(nuevaCentral).subscribe({
            next: (savedCentral: any) => {
              // Mapea el objeto guardado de vuelta al formato de Angular
              const centralConId: Centrales = {
                id: savedCentral.id,
                nombre: savedCentral.nombre,
                Ubicacion: savedCentral.direccion,
                empresa: savedCentral.empresaId,
              };

              this.centrales.update(currentCentrales => [...currentCentrales, centralConId]);
              console.log('Nueva Central guardada en BD:', centralConId);
            },
            error: (err) => console.error('Error al agregar la central al servidor', err)
          });
        }
      }
    });
  }

  // === FUNCIONES PÚBLICAS ===

  agregarCentral(): void {
    this.openCentralDialog(null);
  }

  editarCentral(central: Centrales): void {
    this.openCentralDialog(central);
  }

  borrarCentral(central: Centrales): void {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas borrar la central: ${central.nombre} (ID: ${central.id})?`);

    if (confirmacion) {
      // Caso BORRAR (DELETE)
      this.centralesService.deleteCentral(central.id).subscribe({
        next: () => {
          this.centrales.update(currentCentrales =>
            currentCentrales.filter(c => c.id !== central.id)
          );
          console.log('Central eliminada de la BD:', central.id);
        },
        error: (err) => console.error('Error al eliminar la central del servidor', err)
      });
    }
  }
}
/*import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
export interface Centrales {
  id: number;
  Ubicacion: string;
  empresa: string;
}
@Component({
  selector: 'aa-dialog-centrales'/*'app-centrales',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule,MatDialog],
  templateUrl: './centrales.html',
  styleUrls: ['./centrales.css']
})

export class DialogCentralesComponent {
  // 1. Inyectar MatDialogRef para poder cerrar el diálogo
  private dialogRef = inject(MatDialogRef<DialogCentralesComponent>);

  // 2. Signals para vincular a los campos del formulario
  ubicacion = signal<string>('');
  nombre = signal<string>(''); // Asumo que 'nombre' es el nombre de la central basado en tu JSON
  empresa = signal<string>('');

  // Función para cancelar y cerrar el diálogo
  onNoClick(): void {
    this.dialogRef.close();
  }
}*/
/*
export class CentralesComponent {
  Centrales: Centrales[] = [
        { id: 1, Ubicacion: 'Empire State Building  34th Street - Estados Unidos', empresa: 'Ardu'},
        { id: 2, Ubicacion: 'Charing Cross Road - Reino Unido', empresa: 'Fiat'},
        { id: 3, Ubicacion: 'Greater London - Reino Unido', empresa: 'Samsung'},
        { id: 4, Ubicacion: 'Texas State Capitol, 1100 Congress Ave - Estados Unidos', empresa: 'Walmart'},
      ];
}*/
