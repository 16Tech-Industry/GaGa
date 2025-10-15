import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/services/auth';

// Decorador que define el componente
@Component({
  selector: 'app-ingreso',
  standalone: true,
  templateUrl: './ingreso.html',
  styleUrls: ['./ingreso.css', '../formulario-ingreso.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class IngresoComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  // Inyección de dependencias
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
 // Método que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.createForm();
  }

  // Crear formulario reactivo
  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // Enviar formulario
  onSubmit(): void {
    this.errorMessage = '';
    
// Si el formulario no pasa las validaciones, se marcan los campos con error
    if (this.loginForm.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    this.isLoading = true; // se activa el indicador de carga
    const { email, contrasenia } = this.loginForm.value;  // se obtienen los valores del formulario

// Se llama al servicio de autenticación
    this.authService.login(email, contrasenia).subscribe({
      next: (result) => {
        this.isLoading = false;
        if (!result.success) {
          this.errorMessage = result.message || 'Credenciales inválidas';
        }
        // Si el login es exitoso, el AuthService debería redirigir
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error inesperado. Intenta nuevamente.';
        console.error(error);
      }
    });
  }

  // Ir al registro
  irARegistro(): void {
    this.router.navigate(['/registro']);
  }

  
  // Ir al home
  inicio(): void {
    this.router.navigate(['/home']);
  }

  // Llenar credenciales de prueba (opcional)
  fillTestCredentials(email: string, contrasenia: string): void {
    this.loginForm.patchValue({ email, contrasenia });
    this.errorMessage = '';
  }

  // Marcar campos como tocados (para mostrar errores)
  private markAllFieldsAsTouched(): void {
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

  // Obtener mensaje de error
  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);

    if (control?.errors) {
      if (control.errors['required'])
        return field === 'email' ? 'El email es requerido' : 'La contraseña es requerida';
      if (control.errors['email'])
        return 'Ingresa un email válido';
      if (control.errors['minlength'])
        return 'La contraseña debe tener al menos 3 caracteres';
    }

    return '';
  }
}

