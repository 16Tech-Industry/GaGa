// app.routes.ts // 
import { Routes } from '@angular/router';

import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { FormularioRegistro } from './auth/formulario-registro/formulario-registro';
import { HomeView } from './home_view/home_view';
import { Ingreso } from './auth/ingreso/ingreso';

// Componentes del dashboard de administrador
import { DashAdm } from './dash-adm/dash-adm';
import { EmpresaComponent } from './dash-adm/empresa/empresa';
import { UsuarioComponent } from './dash-adm/usuario/usuario';
import { CentralesComponent } from './dash-adm/centrales/centrales';
// Componentes del dashboard de usuario
import { DashUser } from './dash-user/dash-user';
import { Metricas } from './components/metricas/metricas';
import { HistorialComponent } from './components/historial/historial';
import { Alertas } from './components/alertas/alertas';

// componente de ruta no encontrada
import { Error404Component } from './error404/error404.component';


export const routes: Routes = [
  { path: '', component: HomeView, title: 'Home' },
  { path: 'home', component: HomeView, title: 'Home' },
    // ruta para tu componente 'quienes-somos'
  { path: 'quienes-somos', component: QuienesSomosComponent },

  //{path: '', component: FormularioRegistro},
  { path: 'sing-up', component: FormularioRegistro },
  { path: 'login', component: Ingreso },

  // Ruta del dashboard administrador
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
  //dashboard usuario 
  {
    path: 'dash-user',
    component: DashUser,
    children: [
      { path: '', redirectTo: 'temperatura', pathMatch: 'full' },
      { path: 'temperatura', component: Metricas },
      { path: 'historial', component: HistorialComponent },
      { path: 'alertas', component: Alertas },
    ]
  },
  // Ruta comodín para manejar URLs no encontradas
  { path: '**', component: Error404Component }

];
