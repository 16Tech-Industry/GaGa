import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-home.view',
  imports: [Header, Footer],
  templateUrl: './home_view.html',
  styleUrl: './home_view.css'
})
export class HomeView {

}
