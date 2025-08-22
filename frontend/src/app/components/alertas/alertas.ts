import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // necesario para *ngFor y pipes
import { FormsModule } from '@angular/forms';   // necesario para [(ngModel)]

@Component({
  selector: 'app-alertas',
  standalone: true,          // importante para componentes independientes
  imports: [CommonModule, FormsModule],
  templateUrl: './alertas.html',
  styleUrls: ['./alertas.css']
})
export class Alertas {
  temperaturaUmbral: number = 30;
  notificarPorEmail: boolean = true;
  notificarPorSonido: boolean = false;

  alertasActivas = [
    { fecha: new Date(), tipo: 'Temperatura', valor: 35, estado: 'Activa' },
    { fecha: new Date(), tipo: 'Consumo', valor: 12.5, estado: 'Activa' }
  ];

  guardarConfiguracion() {
    console.log('Configuración guardada:', {
      temperaturaUmbral: this.temperaturaUmbral,
      notificarPorEmail: this.notificarPorEmail,
      notificarPorSonido: this.notificarPorSonido
    });
    alert('Configuración de alertas guardada correctamente ✅');
  }
}
