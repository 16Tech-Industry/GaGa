import { Routes } from '@angular/router';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { FormularioRegistro } from './auth/formulario-registro/formulario-registro';
import { HomeView } from './home_view/home_view';
import { Ingreso } from './auth/ingreso/ingreso';
import { DashAdm } from './dash-adm/dash-adm';
import { EmpresaComponent } from './dash-adm/empresa/empresa';
import { UsuarioComponent } from './dash-adm/usuario/usuario';
import { CentralesComponent } from './dash-adm/centrales/centrales';
import { DashUser } from './dash-user/dash-user';
import { Metricas } from './components/metricas/metricas';
import { HistorialComponent } from './components/historial/historial';
import { Alertas } from './components/alertas/alertas';
import { Error404Component } from './error404/error404.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { AuthService } from './services/auth';


export const routes: Routes = [
  { path: '', component: HomeView, title: 'Home' },
  { path: 'home', component: HomeView, title: 'Home' },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'sing-up', component: FormularioRegistro },
  { path: 'login', component: Ingreso },
  {
    path: 'dash-admin',
    component: DashAdm,
    children: [
      { path: '', redirectTo: 'empresa', pathMatch: 'full' },
      { path: 'empresa', component: EmpresaComponent },
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
      { path: 'historial', component: HistorialComponent },
      { path: 'alertas', component: Alertas },
    ],
  },
  { path: '**', component: Error404Component }
];

