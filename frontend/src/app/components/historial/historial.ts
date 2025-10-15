// historial.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { HistorialService, Historial as HistorialData } from '../../services/historial.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './historial.html',
  styleUrls: ['./historial.css']
})
export class Historial implements OnInit {

  temperaturaData: ChartData<'line', number[], string> = {
    labels: [],
    datasets: [{ label: 'Temperatura (°C)', data: [], borderColor: '#ff6384', fill: false }]
  };

  humedadData: ChartData<'line', number[], string> = {
    labels: [],
    datasets: [{ label: 'Humedad (%)', data: [], borderColor: '#36a2eb', fill: false }]
  };

  consumoData: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [{ label: 'Consumo (L)', data: [], backgroundColor: 'rgba(54, 162, 235, 0.6)' }]
  };

  ahorroData: ChartData<'doughnut', number[], string> = {
    labels: ['Watt Consumidos', 'Diferencia'],
    datasets: [{ label: 'Consumo Energético', data: [0, 0], backgroundColor: ['green','gray'] }]
  };

  options: ChartOptions<any> = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true } }
  };

  constructor(private historialService: HistorialService) {}

  ngOnInit(): void {
    this.historialService.getHistorial().subscribe((data: HistorialData[]) => {
      console.log('Datos API historial:', data);

      const labels = data.map(d => new Date(d.fecha).toLocaleTimeString());
      this.temperaturaData.labels = labels;
      this.humedadData.labels = labels;
      this.consumoData.labels = labels;

      this.temperaturaData.datasets[0].data = data.map(d => Number(d.temperatura) || 0);
      this.humedadData.datasets[0].data = data.map(d => Number(d.humedad) || 0);
      this.consumoData.datasets[0].data = data.map(d => Number(d.litros_consumidos) || 0);

      const totalWatt = data.reduce((sum, d) => sum + Number(d.watt_consumidos || 0), 0);
      const maxWatt = 20000;
      this.ahorroData.datasets[0].data = [totalWatt, maxWatt - totalWatt];
    });
  }
}
