import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth';
import { HomeView } from './home_view/home_view';
import { Ingreso } from './auth/ingreso/ingreso';
import { DashAdm } from './dash-adm/dash-adm';
import { FormularioRegistro } from './auth/formulario-registro/formulario-registro';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  protected readonly title = signal('GaGa');

  constructor(public router: Router) {}
}

@NgModule({
  declarations: [
    Ingreso,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService
  ],
})
export class AppModule { }