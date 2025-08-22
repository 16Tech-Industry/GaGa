import { Routes } from '@angular/router';
import { DashUser } from './dash-user/dash-user';
import { Metricas } from './components/metricas/metricas';
import { Historial } from './components/historial/historial';
import { Alertas } from './components/alertas/alertas';

export const routes: Routes = [
  {
    path: 'dash-user',
    component: DashUser,
    children: [
      { path: 'temperatura', component: Metricas },
      { path: 'historial', component: Historial },
      { path: 'alertas', component: Alertas },
      { path: '', redirectTo: 'temperatura', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/dash-user', pathMatch: 'full' }
];
