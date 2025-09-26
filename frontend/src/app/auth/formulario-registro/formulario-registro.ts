import { Component } from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl,} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@app/services/auth';
import { User } from '@app/models/User';


export const validacionContIguales: ValidatorFn= (control: AbstractControl):{[key: string]:any} | null => {
  const contrasenia = control.get('contrasenia');
  const confirmarContrasenia = control.get('confirmarContrasenia');

  if (contrasenia && confirmarContrasenia && contrasenia.value !== confirmarContrasenia.value) {
    return { 'contraseniasOk': true };
  } else {
    return null;
  }
};
@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './formulario-registro.html',
  styleUrls:  [
    './formulario-registro.css',
  '../formulario-ingreso.css'  // compartido
            ]
})

export class FormularioRegistro {
formularioRegistro: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
    this.formularioRegistro = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contrasenia: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{5,12}$') ]),
    confirmarContrasenia: new FormControl('', [Validators.required,]),
    cuit: new  FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
},
  {validators: validacionContIguales});
}
/* se mueven los get del html al typescript */
get nombre() {
  return this.formularioRegistro.get('nombre');
}

get apellido() {
  return this.formularioRegistro.get('apellido');
}

get cuit() {
  return this.formularioRegistro.get('cuit');
}

get email() {
  return this.formularioRegistro.get('email');
}
/**gets mostrar invalidos */
get mostrarCuitInvalido(){
  return this.cuit?.invalid && this.cuit?.touched;
}

get mostrarEmailIvalido(){
  return this.email?.invalid && this.email?.touched;
}

get contrasenia() {
  return this.formularioRegistro.get('contrasenia');
}

get confirmarContrasenia(){
  return this.formularioRegistro.get('confirmarContrasenia');
}

get mostrarContraseniaInvalida(){
  return this.contrasenia?.invalid && this.contrasenia?.touched;
}

get contraseniasNoCoinciden(){
  return this.formularioRegistro.hasError('contraseniasOk') && this.confirmarContrasenia?.touched;
}

/**Eventos */
inicio() {
  this.router.navigate(['/']);
}

onSubmit(): void {
  if (this.formularioRegistro.valid) {
    const { nombre, apellido, email, contrasenia, cuit } = this.formularioRegistro.value;
    const newUser: Omit<User, 'id'> = {
      nombre,
      apellido,
      email,
      contrasenia,
      cuitEmpresa: cuit
    };

    this.authService.createUser(newUser).subscribe({
      next: (response: User) => {
        console.log('Usuario creado:', response);
        alert('¡Registro exitoso!');
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error en el registro:', error);
        alert('Hubo un error durante el registro. Por favor, inténtalo de nuevo.');
      }
    });
  } else {
    this.formularioRegistro.markAllAsTouched();
  }
}
}
