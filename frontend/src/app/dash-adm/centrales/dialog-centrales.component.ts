import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importaciones de Angular Material
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

/**
 * Define la estructura de los datos que el diálogo devuelve al componente principal.
 * Coincide con los campos editables del modelo Centrales.
 */
export interface DialogCentralesResult {
  n_serie: number;
  direccion: string;
  EMPRESAS_id_empresa: number;
}

/**
 * Define la estructura de los datos que el componente principal envía al diálogo.
 */
export interface DialogData {
  id_central: number | null;
  n_serie: number;
  direccion: string;
  EMPRESAS_id_empresa: number;
}

@Component({
  selector: 'app-dialog-centrales',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './dialog-centrales.component.html',
})
export class DialogCentralesComponent implements OnInit {

  private dialogRef = inject(MatDialogRef<DialogCentralesComponent>);
  
  // Inyecta los datos iniciales o crea un objeto vacío si es para una nueva central.
  public data: DialogData = inject(MAT_DIALOG_DATA, { optional: true }) || 
    { id_central: null, n_serie: 0, direccion: '', EMPRESAS_id_empresa: 0 };

  // Signals para vincular a los campos del formulario.
  n_serie = signal<number>(0);
  direccion = signal<string>('');
  EMPRESAS_id_empresa = signal<number>(0);

  ngOnInit(): void {
    // Si se están editando datos, inicializa los signals con los valores recibidos.
    if (this.data) {
      this.n_serie.set(this.data.n_serie);
      this.direccion.set(this.data.direccion);
      this.EMPRESAS_id_empresa.set(this.data.EMPRESAS_id_empresa);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
