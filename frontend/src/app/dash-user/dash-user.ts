import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../components/navbar/navbar';
import { Footer } from '../components/footer/footer';

@Component({
  selector: 'app-dash-user',
  standalone: true,
  imports: [
    RouterModule,  
    Navbar,
    Footer
  ],
  templateUrl: './dash-user.html',
  styleUrls: ['./dash-user.css']
})
export class DashUser {}
