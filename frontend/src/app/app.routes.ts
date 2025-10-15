// Importaciones necesarias para definir las rutas y los componentes
import { Routes } from '@angular/router';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { FormularioRegistro } from './auth/formulario-registro/formulario-registro';
import { HomeView } from './home_view/home_view';
import { IngresoComponent } from './auth/ingreso/ingreso';
import { DashAdm } from './dash-adm/dash-adm';
import { EmpresaComponent } from './dash-adm/empresa/empresa';
import { UsuarioComponent } from './dash-adm/usuario/usuario';
import { CentralesComponent } from './dash-adm/centrales/centrales';
import { DashUser } from './dash-user/dash-user';
import { Metricas } from './components/metricas/metricas';
import { Historial } from './components/historial/historial';
import { Alertas } from './components/alertas/alertas';
import { Error404Component } from './error404/error404.component';
// Módulos base de Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { AuthService } from './services/auth';

// DEFINICIÓN DE LAS RUTAS PRINCIPALES DE LA APLICACIÓN
export const routes: Routes = [
   // Ruta raíz o inicial → muestra el componente HomeView
  { path: '', component: HomeView, title: 'Home' },
  { path: 'home', component: HomeView, title: 'Home' },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'sing-up', component: FormularioRegistro },
  { path: 'login', component: IngresoComponent },
  { path: 'registro', component: FormularioRegistro },

   // RUTAS DEL DASHBOARD ADMINISTRADOR

  {
    path: 'dash-admin',  // ruta base del panel admin
    component: DashAdm,  // componente principal del dashboard admin
    children: [             // rutas hijas dentro del panel
      { path: '', redirectTo: 'empresa', pathMatch: 'full' }, // redirección por defecto
      { path: 'empresa', component: EmpresaComponent },        // gestión de empresas
      { path: 'usuario', component: UsuarioComponent },
      { path: 'centrales', component: CentralesComponent },
    ],
  },
  {
    path: 'dash-user',
    component: DashUser,
    children: [
      { path: '', redirectTo: 'temperatura', pathMatch: 'full' },
      { path: 'temperatura', component: Metricas },
      { path: 'historial', component: Historial },
      { path: 'alertas', component: Alertas },
    ],
  }, // RUTA POR DEFECTO (404)
  { path: '**', component: Error404Component }
];

