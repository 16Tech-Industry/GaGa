import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { MetricasService, Metrica } from '../../services/metricas.service';

@Component({
  selector: 'app-metricas',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './metricas.html',
  styleUrls: ['./metricas.css']
})
export class Metricas implements OnInit {
  public chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Temperatura (°C)' },
      { data: [], label: 'Consumo (kWh)' }
    ]
  };

  public chartOptions: ChartOptions<'bar'> = {
    responsive: true
  };

  constructor(private metricasService: MetricasService) {}

  ngOnInit(): void {
    this.metricasService.getMetricas().subscribe((data: Metrica[]) => {
      this.chartData.labels = data.map((m) => `Métrica ${m.id}`);
      this.chartData.datasets[0].data = data.map((m) => m.temperatura);
      this.chartData.datasets[1].data = data.map((m) => m.consumo);
    });
  }
}
