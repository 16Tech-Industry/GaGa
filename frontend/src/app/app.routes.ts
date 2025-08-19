import { Routes } from '@angular/router';
import { DashAdm } from './dash-adm/dash-adm';

export const routes: Routes = [
    {path:'dashboard', component: DashAdm},
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    // aca agregar ubicacion de error :D

];
