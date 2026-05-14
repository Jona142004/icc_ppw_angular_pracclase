import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-hero.html',
  styleUrl: './app-hero.css',
})
export class AppHeroComponent {
  readonly title = signal('Componentes Standalone Reutilizables');
  readonly topics = signal(['signals', 'computed', '@if', '@for', '@switch', 'pipes']);
  readonly subtitle = computed(() => `Temas activos: ${this.topics().length}`);
  readonly viewMode = signal<'lista' | 'resumen'>('lista');

  toggleMode(): void {
    this.viewMode.update((m) => (m === 'lista' ? 'resumen' : 'lista'));
  }
}