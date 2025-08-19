import { Routes } from '@angular/router';
import { DashAdm } from './dash-adm/dash-adm';
import { HomeView } from './home.view/home.view';

export const routes: Routes = [
    { path: '', component: HomeView, title: 'Home' },
    { path: 'dashboard', component: DashAdm, title: 'Dashboard' },
    // aca agregar ubicacion de error :D

];
