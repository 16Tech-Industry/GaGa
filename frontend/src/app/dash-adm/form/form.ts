// src/app/dash-adm/form/form.ts
import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '@app/models/User';

export interface DialogData {
  nombre: string;
  apellido: string;
  email: string;
  cuitEmpresa: string;
}

@Component({
  selector: 'form',
  templateUrl: 'form.html',
  standalone: true,
  imports: [
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
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  readonly nombre = model(this.data.nombre);
  readonly apellido = model(this.data.apellido);
  readonly email = model(this.data.email);
  readonly cuitEmpresa = model(this.data.cuitEmpresa);

  onNoClick(): void {
    this.dialogRef.close();
  }
}