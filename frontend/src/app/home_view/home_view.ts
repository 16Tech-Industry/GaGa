import { Component } from '@angular/core';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';
import { HistorialService, Historial } from '../services/historial.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgChartsModule],
  templateUrl: './home_view.html',
  styleUrls: ['./home_view.css']
})
export class HomeView {
  temperaturaData: any;
    humedadData: any;
    consumoData: any;
    ahorroData: any;
  
    options = {
      responsive: true,
      maintainAspectRatio: false
    };
  
    constructor(private historialService: HistorialService) {}
  

 }
