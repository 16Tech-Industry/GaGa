import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../components/navbar/navbar'; // ruta correcta

@Component({
  selector: 'app-dash-user',
  standalone: true,
  imports: [
    RouterModule,
    Navbar   
  ],
  templateUrl: './dash-user.html',
  styleUrls: ['./dash-user.css']
})
export class DashUser {}
