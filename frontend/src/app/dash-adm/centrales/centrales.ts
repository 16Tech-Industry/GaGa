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
// Inyección de dependencias utilizando la nueva función 'inject' (más limpia que el constructor)
  private dialog = inject(MatDialog); // Servicio de Angular Material para abrir diálogos modales
  private centralesService = inject(CentralesService); // Servicio personalizado que gestiona la comunicación con la API

  centrales = signal<Centrales[]>([]); // Signal reactivo que almacena la lista de centrales

  // Carga los datos al iniciar el componente. Llama a la función que carga las centrales desde el backend
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
        this.centrales.set(mappedData); // Actualiza el signal con la nueva lista
      },
      error: (err) => {
        console.error('Error al cargar las centrales. Verifica que JSON Server esté corriendo.', err);
      }
    });
  }

  private openCentralDialog(data: DialogData | null): void {
    const dialogRef = this.dialog.open(DialogCentralesComponent, {
      // Se abre el componente de diálogo
      width: '400px',
      data: data
    });
   // afterClosed() se ejecuta cuando el usuario cierra el modal (ya sea guardando o cancelando)
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
        // Se envía la central editada al backend y, si tiene éxito, se actualiza el estado local
          this.centralesService.updateCentral(centralEditada).subscribe({
            next: () => {
              this.centrales.update(currentCentrales =>
                // Reemplaza la central modificada en la lista actual
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
          // Se crea una nueva central en el servidor
          this.centralesService.createCentral(nuevaCentral).subscribe({
            next: (savedCentral: any) => {
              // Mapea el objeto guardado de vuelta al formato de Angular
              const centralConId: Centrales = {
                id: savedCentral.id,
                nombre: savedCentral.nombre,
                Ubicacion: savedCentral.direccion,
                empresa: savedCentral.empresaId,
              };
            // Actualiza el estado agregando la nueva central
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
 // Abre modal sin datos para crear una nueva central
  agregarCentral(): void {
    this.openCentralDialog(null);
  }

  editarCentral(central: Centrales): void { // abre modal con datos ya cargados para editar
    this.openCentralDialog(central);
  }
// Confirma y elimina una central seleccionada
  borrarCentral(central: Centrales): void {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas borrar la central: ${central.nombre} (ID: ${central.id})?`);

    if (confirmacion) {
      // Caso BORRAR (DELETE)
      this.centralesService.deleteCentral(central.id).subscribe({
        next: () => {
          this.centrales.update(currentCentrales => // Actualiza la lista local eliminando la central borrada
            currentCentrales.filter(c => c.id !== central.id)
          );
          console.log('Central eliminada de la BD:', central.id);
        },
        error: (err) => console.error('Error al eliminar la central del servidor', err)
      });
    }
  }
}
