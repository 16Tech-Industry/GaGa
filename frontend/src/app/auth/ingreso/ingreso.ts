import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Agrega esto

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ingreso.html',
  styleUrl: './ingreso.css',
})

export class Ingreso {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) // Inyecta Router
  {
    this.form = this.formBuilder.group({
      email: ['', []],
      password: ['', []],
    });
  }

  onSubmit() {
    // Aquí iría la lógica de autenticación
    if (this.form.valid) {
      this.router.navigate(['/dash-admin']); // Navega a la ruta /dash-admin
    }
  }
}