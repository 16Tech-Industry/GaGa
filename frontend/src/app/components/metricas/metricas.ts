// metricas.ts
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { MetricasService, Metrica as MetricaData } from '../../services/metricas.service';

@Component({
  selector: 'app-metricas',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './metricas.html',
  styleUrls: ['./metricas.css']
})
export class Metricas implements OnInit, AfterViewInit {

  temperaturaData: ChartData<'line', number[], string> = {
    labels: [],
    datasets: [{ label: 'Temperatura (°C)', data: [], borderColor: '#ff6384', fill: false }]
  };

  consumoData: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [{ label: 'Consumo (L)', data: [], backgroundColor: 'rgba(54, 162, 235, 0.6)' }]
  };

  ahorroData: ChartData<'doughnut', number[], string> = {
    labels: ['Watt Consumidos', 'Diferencia'],
    datasets: [{ label: 'Consumo Energético', data: [0, 0], backgroundColor: ['#4caf50','#e0e0e0'] }]
  };

  chartOptions: ChartOptions<any> = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true } }
  };

  constructor(private metricasService: MetricasService) {}

  ngOnInit(): void {
    this.metricasService.getMetricas().subscribe((data: MetricaData[]) => {
      const labels = data.map(d => new Date(d.fecha).toLocaleDateString());

      // Temperatura (línea)
      this.temperaturaData.labels = labels;
      this.temperaturaData.datasets[0].data = data.map(d => Number(d.temperatura) || 0);

      // Consumo (barra)
      this.consumoData.labels = labels;
      this.consumoData.datasets[0].data = data.map(d => Number(d.litros_consumidos) || 0);

      // Ahorro (doughnut: watt consumidos vs diferencia)
      const totalWatt = data.reduce((acc, d) => acc + Number(d.watt_consumidos || 0), 0);
      const maxWatt = 1000; // Ajustar según caso
      this.ahorroData.datasets[0].data = [totalWatt, maxWatt - totalWatt];
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Forzar actualización de gráficos después de que Angular renderice el DOM
      if (this.temperaturaData) this.temperaturaData.datasets = [...this.temperaturaData.datasets];
      if (this.consumoData) this.consumoData.datasets = [...this.consumoData.datasets];
      if (this.ahorroData) this.ahorroData.datasets = [...this.ahorroData.datasets];
    }, 0);
  }

}
