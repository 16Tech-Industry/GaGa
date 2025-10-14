import { Component } from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl,} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@app/services/auth';
import { User } from '@app/models/User';

/**
 * ✅ Validador personalizado: validación cruzada entre dos campos del formulario
 * Se asegura de que los campos 'contrasenia' y 'confirmarContrasenia' sean iguales.
 * Si no coinciden, devuelve un objeto de error con la clave 'contraseniasOk'.
 */

export const validacionContIguales: ValidatorFn= (control: AbstractControl):{[key: string]:any} | null => {
  const contrasenia = control.get('contrasenia');
  const confirmarContrasenia = control.get('confirmarContrasenia');

  // Retorna error si los valores son distintos
  if (contrasenia && confirmarContrasenia && contrasenia.value !== confirmarContrasenia.value) {
    return { 'contraseniasOk': true };
  } else {
    return null;
  }
};
@Component({
  selector: 'app-formulario-registro',
  standalone: true, //Permite que el componente sea independiente (sin módulo)
  imports: [ReactiveFormsModule, CommonModule ], // Módulos requeridos para formularios reactivos y directivas comunes
  templateUrl: './formulario-registro.html',
  styleUrl: './formulario-registro.css'
})

export class FormularioRegistro {//FormGroup principal que agrupa todos los campos del formulario
formularioRegistro: FormGroup;
/**
   * Constructor:
   * - Inyecta Router para navegar entre rutas
   * - Inyecta AuthService para registrar usuarios en el backend
   */
  constructor(private router: Router, private authService: AuthService) {
    //Inicializa el formulario con sus controles y validaciones
    this.formularioRegistro = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    // Patrón: 5-12 caracteres, al menos una mayúscula y un carácter especial
    contrasenia: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{5,12}$') ]),
    confirmarContrasenia: new FormControl('', [Validators.required,]),
    // Solo números, exactamente 11 dígitos
    cuit: new  FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
},//validador personalizado aplica a grupo completo
  {validators: validacionContIguales});
}
/* se mueven los get del html al typescript */
//métodos para obtener los datos ingresados
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
/**gets mostrar invalidos, validaciones lógicas */
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
  //va al inicio al hacer click en el logo
  this.router.navigate(['/']);
}
/**
   * Evento principal al enviar el formulario.
   * - Verifica si el formulario es válido.
   * - Crea un objeto 'User' con los datos ingresados.
   * - Llama al servicio AuthService para registrar el usuario.
   * - Muestra alertas según el resultado (éxito o error).
   */

onSubmit(): void {
  if (this.formularioRegistro.valid) {
    const { nombre, apellido, email, contrasenia, cuit } = this.formularioRegistro.value;
    const newUser: Omit<User, 'id'> = {
      nombre,
      apellido,
      email,
      contrasenia,
      cuit_empresa: cuit,
      rol:'usuario'
    };

    // ▼▼▼ AÑADE LA LÍNEA AQUÍ ▼▼▼
    console.log('Datos que se envían al backend:', newUser);

    // Llamada HTTP al servicio de autenticación
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
