import { Component } from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators,} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './formulario-registro.html',
  styleUrl: './formulario-registro.css'
})

export class FormularioRegistro {
formularioRegistro: FormGroup;

  constructor(private router: Router) {
    this.formularioRegistro = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contrasenia: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{5,12}$') ]),
    confirmarContrasenia: new FormControl('', [Validators.required,]),
    cuit: new  FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
});
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
  return this.contrasenia?.value !== this.confirmarContrasenia?.value && this.confirmarContrasenia?.touched;
}

/**Eventos */
inicio() {
  this.router.navigate(['/']);
}
onSubmit() {
  console.log('El formulario es válido:', this.formularioRegistro.valid);
  console.log('Valores del formulario:', this.formularioRegistro.value);
  console.log('Formulario completo:', this.formularioRegistro);

  if (this.formularioRegistro.valid) {
    this.router.navigate(['/login']);
  }
}
}
