// src/app/dash-adm/form/form.ts
import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
 MAT_DIALOG_DATA, // Token de inyección para pasar datos AL diálogo.
  MatDialogActions, // Contenedor para las acciones del diálogo (botones).
  MatDialogClose, // Directiva para un botón que cierra el diálogo.
  MatDialogContent, // Contenedor para el contenido principal del diálogo.
  MatDialogRef, // Referencia al diálogo abierto, para poder controlarlo (ej: cerrarlo).
  MatDialogTitle, // Contenedor para el título del diálogo.
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Define la estructura de los datos que este diálogo espera recibir.
export interface DialogData {
  nombre: string;
  apellido: string;
  email: string;
  cuit_empresa: string;
}

@Component({
  selector: 'form', // Selector HTML para usar este componente.
  templateUrl: 'form.html', // Ruta al archivo HTML de la vista del formulario.
  standalone: true, // Indica que es un componente autocontenido.
  imports: [ // Lista de módulos y componentes necesarios para la plantilla (form.html).
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogOverviewExampleDialog {
  // Inyecta las dependencias necesarias para manejar el diálogo y los datos.
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  // recibe la configuracion inicial del dialogo, sean datos o la est5ructura vacia
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  // modelos de datos enlazados a los campos del formulario en la vista (form.html)
  readonly nombre = model(this.data.nombre);
  readonly apellido = model(this.data.apellido);
  readonly email = model(this.data.email);
  readonly cuit_empresa = model(this.data.cuit_empresa);

  //Método que se llama cuando se hace clic en el botón de cancelar/cerrar.
  //    Cierra el diálogo sin devolver ningún dato.
  onNoClick(): void {
    this.dialogRef.close();
  }
}