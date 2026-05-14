import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-footer.html',
  styleUrl: './app-footer.css',
})
export class AppFooterComponent {
  readonly autor = signal('jonathan');
  readonly curso = signal('Programación y Plataformas Web');
  readonly fechaActual = signal(new Date());
  readonly version = signal(21.0);
  readonly visitas = signal(1234567);
  readonly mensaje = signal('Gracias por revisar esta práctica de Angular');

  readonly anioActual = computed(() => this.fechaActual().getFullYear());
}