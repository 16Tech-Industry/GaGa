import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialService, Historial } from '../../services/historial.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-historial',                   // Selector para usar en HTML
  standalone: true,                            // Componente independiente
  imports: [CommonModule, NgChartsModule],     // Importa módulos necesarios
  templateUrl: './historial.html',             // Template asociado
  styleUrls: ['./historial.css']               // Estilos asociados
})
export class HistorialComponent implements OnInit {
  // Variables que guardan la información para cada gráfico
  temperaturaData: any;
  humedadData: any;
  consumoData: any;
  ahorroData: any;

  // Opciones generales de los gráficos
  options = {
    responsive: true,          // Se adaptan al tamaño de pantalla
    maintainAspectRatio: false // Permite ajustar alto/anchura libremente
  };

  // Inyección del servicio que obtiene datos del historial
  constructor(private historialService: HistorialService) {}

  // Se ejecuta al inicializar el componente
  ngOnInit() {
    // Llama al servicio y se suscribe para recibir los datos
    this.historialService.getHistorial().subscribe((data: Historial[]) => {
      // Extrae las fechas para usarlas como labels en los gráficos
      const fechas = data.map(d => d.fecha);

      // Configuración del gráfico de Temperatura
      this.temperaturaData = {
        labels: fechas,
        datasets: [
          {
            data: data.map(d => d.temperatura),
            label: 'Temperatura (°C)',
            borderColor: '#ff6384',     // Color de línea
            backgroundColor: '#ff6384', // Color del punto
            fill: false,                // No rellenar debajo de la línea
            tension: 0.3                // Curvatura de la línea
          }
        ]
      };

      // Configuración del gráfico de Humedad
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

      // Configuración del gráfico de Consumo
      this.consumoData = {
        labels: fechas,
        datasets: [
          {
            data: data.map(d => d.consumo),
            label: 'Consumo (kWh)',
            backgroundColor: '#ffce56'  // Color de las barras
          }
        ]
      };

      // Configuración del gráfico de Ahorro
      this.ahorroData = {
        labels: fechas,
        datasets: [
          {
            data: data.map(d => d.ahorro),
            label: 'Ahorro (%)',
            // Colores diferentes para cada sector del doughnut
            backgroundColor: ['#4bc0c0', '#ff9f40', '#9966ff']
          }
        ]
      };
    });
  }
}
