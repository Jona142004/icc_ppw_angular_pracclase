import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AppFooterComponent } from "../app-footer/app-footer";

@Component({
  selector: 'app-header',
  imports: [RouterLink, UpperCasePipe, RouterLinkActive, AppFooterComponent, RouterOutlet],
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