import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // para usar routerLink en el template

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent { }
