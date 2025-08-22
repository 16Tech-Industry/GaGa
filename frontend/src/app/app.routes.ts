// app.routes.ts // 
import { Routes } from '@angular/router';
import { DashAdm } from './dash-adm/dash-adm';
import { FormularioRegistro } from './auth/formulario-registro/formulario-registro';
// Componentes del dashboard
import { EmpresaComponent } from './dash-adm/empresa/empresa';
import { UsuarioComponent} from './dash-adm/usuario/usuario';
import { CentralesComponent} from './dash-adm/centrales/centrales';



export const routes: Routes = [
    {path: '', component: FormularioRegistro},
    {path: 'inicio', component: FormularioRegistro},
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},

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