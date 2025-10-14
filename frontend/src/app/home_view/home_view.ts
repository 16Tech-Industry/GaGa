import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';

@Component({
  selector: 'app-home-view',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl:'./home_view.html',
=======
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home_view.html',
>>>>>>> b65f8c0968a8b7162a3d05b7b756a669cbf2a344
  styleUrls: ['./home_view.css']
})
export class HomeView { }
