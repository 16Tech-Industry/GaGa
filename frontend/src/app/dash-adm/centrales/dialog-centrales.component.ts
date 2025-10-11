import { Component, signal, inject, OnInit } from '@angular/core'; // <-- Importar OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//VENTABA MODAL
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface DialogCentralesResult {
  nombre: string;
  Ubicacion: string;
  empresa: string;
}

export interface DialogData {
  id: string | null;
  nombre: string;
  Ubicacion: string;
  empresa: string;
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


  public data: DialogData = inject(MAT_DIALOG_DATA, {
    optional: true,

  }) || { id: null, nombre: '', Ubicacion: '', empresa: '' };

  // Signals para vincular a los campos del formulario
  ubicacion = signal<string>('');
  nombre = signal<string>('');
  empresa = signal<string>('');
  centralId: string | null = null;

  ngOnInit(): void {

    if (this.data) {
      this.centralId = this.data.id;
      this.nombre.set(this.data.nombre);
      this.ubicacion.set(this.data.Ubicacion);
      this.empresa.set(this.data.empresa);
    }
  }

  // Función para cancelar y cerrar el diálogo
  onNoClick(): void {
    this.dialogRef.close();
  }
}
