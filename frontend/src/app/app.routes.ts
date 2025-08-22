import { Routes } from '@angular/router';
import { DashAdm } from './dash-adm/dash-adm';
import { FormularioRegistro } from './auth/formulario-registro/formulario-registro';




export const routes: Routes = [
    {path:'dashboard', component: DashAdm},
    {path: '', component: FormularioRegistro},
    {path: 'inicio', component: FormularioRegistro},
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},

];
