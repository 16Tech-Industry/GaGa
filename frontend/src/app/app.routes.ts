// app.routes.ts // 
import { Routes } from '@angular/router';
import { DashAdm } from './dash-adm/dash-adm';

// Componentes del dashboard
import { Empresa } from './dash-adm/empresa/empresa';
import { Usuario, UsuarioComponent} from './dash-adm/usuario/usuario';
import { Centrales} from './dash-adm/centrales/centrales';

export const routes: Routes = [

  // Ruta del dashboard, que contiene las rutas anidadas
  {
    path: 'dashboard-admin',
    component: DashAdm,
    children: [
      { path: '', redirectTo: 'empresa', pathMatch: 'full' },
      { path: 'empresa', component: Empresa },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'centrales', component: Centrales },
    ],
  },
  
  // Ruta comodín para manejar URLs no encontradas
  { path: '**', redirectTo: '' },
];