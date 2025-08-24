import { Component } from '@angular/core';
import { HeaderComponent } from '../home_view/header/header';
import { FooterComponent } from '../home_view/footer/footer';

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './quienes-somos.html',
  styleUrls: ['./quienes-somos.css']
})
export class QuienesSomosComponent {}
