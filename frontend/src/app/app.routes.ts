// app.routes.ts // 
import { Routes } from '@angular/router';
import { DashAdm } from './dash-adm/dash-adm';
import { DashUser } from './dash-user/dash-user';
import { FormularioRegistro } from './auth/formulario-registro/formulario-registro';
import { HomeView } from './home_view/home_view';
// Componentes del dashboard
import { EmpresaComponent } from './dash-adm/empresa/empresa';
import { UsuarioComponent } from './dash-adm/usuario/usuario';
import { CentralesComponent } from './dash-adm/centrales/centrales';

import { Metricas } from './components/metricas/metricas';
import { Historial } from './components/historial/historial';
import { Alertas } from './components/alertas/alertas';


export const routes: Routes = [
  //{path: '', component: FormularioRegistro},
  { path: 'inicio', component: FormularioRegistro },

  // Ruta del dashboard, que contiene las rutas anidadas
  {
    path: 'dashboard-admin',
    component: DashAdm,
    children: [
      { path: '', redirectTo: 'empresa', pathMatch: 'full' },
      { path: 'empresa', component: EmpresaComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'centrales', component: CentralesComponent },
    ],
  },
  // Ruta comodín para manejar URLs no encontradas
  {
    path: 'dash-user',
    component: DashUser,
    children: [
      { path: '', redirectTo: 'temperatura', pathMatch: 'full' },
      { path: 'temperatura', component: Metricas },
      { path: 'historial', component: Historial },
      { path: 'alertas', component: Alertas },
    ]
  },
  { path: '', component: HomeView, title: 'Home' },
  // aca agregar ubicacion de error :D
  { path: '**', redirectTo: '' },
];
