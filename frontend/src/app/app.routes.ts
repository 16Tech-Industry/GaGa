// app.routes.ts // 
import { Routes } from '@angular/router';
import { DashAdm } from './dash-adm/dash-adm';

// Componentes del dashboard
import { EmpresaComponent } from './dash-adm/empresa/empresa';
import { UsuarioComponent} from './dash-adm/usuario/usuario';
import { CentralesComponent} from './dash-adm/centrales/centrales';

export const routes: Routes = [

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
  { path: '**', redirectTo: '' },
];