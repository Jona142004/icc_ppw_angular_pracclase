import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './components/app-header/app-header';
import { AppHeroComponent } from './components/app-hero/app-hero';
import { AppFooterComponent } from './components/app-footer/app-footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppHeaderComponent, AppHeroComponent, AppFooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'ppw-angular-21';
}