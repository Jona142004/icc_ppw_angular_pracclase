import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {

  readonly brand = signal("ppw Angular");
  readonly showInfo = signal(false);
  readonly toggleLabel = computed(() => this.showInfo() ? "Ocultar informacion" : "Mostrar información");

  changeBrand(): void {
    this.brand.update((valor) => valor + "!");
  }

  resetBrand(): void {
    this.brand.set("ppw Angular");
  }

  toggleInfo(): void {
    this.showInfo.update((valor) => !valor);
  }
}