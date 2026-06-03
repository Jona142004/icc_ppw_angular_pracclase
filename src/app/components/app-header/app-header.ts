import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, UpperCasePipe, RouterLinkActive],
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
  
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.user;
  role = this.authService.role;

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth']);
    });
  }

}