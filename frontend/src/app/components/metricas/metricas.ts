import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { MetricasService, Metrica } from '../../services/metricas.service';

@Component({
  selector: 'app-metricas',            // Selector del componente para usarlo en HTML
  standalone: true,                    // Componente independiente (Angular 15+)
  imports: [CommonModule, NgChartsModule], // Importa módulos necesarios
  templateUrl: './metricas.html',      // Template asociado
  styleUrls: ['./metricas.css']        // Estilos asociados
})
export class Metricas implements OnInit {
  // Configuración inicial del gráfico
  public chartData: ChartData<'bar'> = {
    labels: [], // Etiquetas dinámicas que se mostrarán en el eje X
    datasets: [
      { data: [], label: 'Temperatura (°C)' }, // Primer dataset para temperaturas
      { data: [], label: 'Consumo (kWh)' }     // Segundo dataset para consumo eléctrico
    ]
  };

  // Opciones de configuración del gráfico
  public chartOptions: ChartOptions<'bar'> = {
    responsive: true // Hace que el gráfico se adapte al tamaño de la pantalla
  };

  // Inyección del servicio que provee las métricas
  constructor(private metricasService: MetricasService) {}

  // Ciclo de vida: al inicializar el componente
  ngOnInit(): void {
    // Se suscribe al servicio que obtiene métricas desde backend/API
    this.metricasService.getMetricas().subscribe((data: Metrica[]) => {
      // Asigna etiquetas dinámicas en base al ID de cada métrica
      this.chartData.labels = data.map((m) => `Métrica ${m.id}`);

      // Llena los datasets con valores obtenidos de la API
      this.chartData.datasets[0].data = data.map((m) => m.temperatura);
      this.chartData.datasets[1].data = data.map((m) => m.consumo);
    });
  }
}
