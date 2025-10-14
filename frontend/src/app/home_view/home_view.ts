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
>>>>>>> b65f8c0968a8b7162a3d05b7b756a669cbf2a344
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
  
    ngOnInit() {
      this.historialService.getHistorial().subscribe((data: Historial[]) => {
        const fechas = data.map(d => d.fecha);
  
        this.temperaturaData = {
          labels: fechas,
          datasets: [
            {
              data: data.map(d => d.temperatura),
              label: 'Temperatura (°C)',
              borderColor: '#ff6384',
              backgroundColor: '#ff6384',
              fill: false,
              tension: 0.3
            }
          ]
        };
  
        this.humedadData = {
          labels: fechas,
          datasets: [
            {
              data: data.map(d => d.humedad),
              label: 'Humedad (%)',
              borderColor: '#36a2eb',
              backgroundColor: '#36a2eb',
              fill: false,
              tension: 0.3
            }
          ]
        };
  
        this.consumoData = {
          labels: fechas,
          datasets: [
            {
              data: data.map(d => d.consumo),
              label: 'Consumo (kWh)',
              backgroundColor: '#ffce56'
            }
          ]
        };
  
        this.ahorroData = {
          labels: fechas,
          datasets: [
            {
              data: data.map(d => d.ahorro),
              label: 'Ahorro (%)',
              backgroundColor: ['#4bc0c0', '#ff9f40', '#9966ff']
            }
          ]
        };
      });
    }
 }
