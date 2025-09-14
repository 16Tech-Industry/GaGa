import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.html',
  styleUrl: './ingreso.css',
  standalone:false
})

export class Ingreso implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  // Crear el formulario reactivo
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // Enviar formulario
  onSubmit() {
    // Limpiar mensaje de error
    this.errorMessage = '';
    
    // Si el formulario es inválido, no continuar
    if (this.loginForm.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    // Mostrar loading
    this.isLoading = true;

    // Obtener valores del formulario
    const email = this.loginForm.get('email')?.value;
    const contrasenia = this.loginForm.get('contrasenia')?.value;

    // Llamar al servicio
    this.authService.login(email, contrasenia).subscribe({
      next: (result) => {
        this.isLoading = false;
        
        if (!result.success) {
          this.errorMessage = result.message;
        }
        // Si es exitoso, el servicio ya redirige automáticamente
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error inesperado';
        console.error(error);
      }
    });
  }

  // Llenar credenciales de prueba
  fillTestCredentials(email: string, contrasenia: string) {
    this.loginForm.patchValue({
      email: email,
      contrasenia: contrasenia
    });
    this.errorMessage = '';
  }

  // Marcar todos los campos como tocados para mostrar errores
  private markAllFieldsAsTouched() {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  // Verificar si un campo tiene error
  hasError(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  // Obtener mensaje de error específico
  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    
    if (control?.errors) {
      if (control.errors['required']) {
        return field === 'email' ? 'El email es requerido' : 'La contraseña es requerida';
      }
      if (control.errors['email']) {
        return 'Ingresa un email válido';
      }
      if (control.errors['minlength']) {
        return 'La contraseña debe tener al menos 3 caracteres';
      }
    }
    
    return '';
  }
}