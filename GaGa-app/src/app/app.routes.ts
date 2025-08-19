import { Routes } from '@angular/router';
import { QuienesSomos } from './pages/quienes-somos/quienes-somos';

export const routes: Routes = [
    { path: 'quienes-somos', component: QuienesSomos },
    { path: '', redirectTo: 'quienes-somos', pathMatch: 'full' },
    { path: '**', redirectTo: 'quienes-somos', pathMatch: 'full' }
];