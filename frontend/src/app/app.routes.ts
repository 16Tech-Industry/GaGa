import { Routes } from '@angular/router';
import { DashAdmComponent } from './dash-adm/dash-adm.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { Error404Component } from './error404/error404.component';

export const routes: Routes = [
  // Redirige la URL raíz ('') a la página de 'quienes-somos'
  { path: '', redirectTo: '/quienes-somos', pathMatch: 'full' }, 
  // Esta es la ruta para tu componente 'quienes-somos'
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'dashboard', component: DashAdmComponent },
  { path: '**', component: Error404Component }
];