// src/app/dash-adm/dash-adm.component.ts

import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component'; // Esta es la única línea que necesitas

@Component({
  selector: 'app-dash-adm',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './dash-adm.component.html',
  styleUrl: './dash-adm.component.css'
})
export class DashAdmComponent { }