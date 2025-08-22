import { Routes } from '@angular/router';
import { Metricas } from '../components/metricas/metricas';
import { HistorialPage } from '../components/historial-page/historial-page';
import { Alertas } from '../components/alertas/alertas';

export const dashUserRoutes: Routes = [
  { path: 'temperatura', component: Metricas },
  { path: 'historial', component: HistorialPage },
  { path: 'alertas', component: Alertas },
  { path: '', redirectTo: 'temperatura', pathMatch: 'full' } // por defecto abre Temperatura
];
