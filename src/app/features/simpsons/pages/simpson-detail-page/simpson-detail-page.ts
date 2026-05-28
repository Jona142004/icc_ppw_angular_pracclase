import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { of, tap } from 'rxjs';
import { SimpsonsService } from '../../services/simpsons.service';
import { SimpsonsCacheService } from '../../services/simpsons-cache.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FavoritesService } from 'src/app/core/services/favorites';

@Component({
  selector: 'app-simpson-detail-page',
  imports: [RouterLink],
  templateUrl: './simpson-detail-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpsonDetailPage {
  // Dependencias del componente.
  private route = inject(ActivatedRoute);
  private simpsonsService = inject(SimpsonsService);
  private cacheService = inject(SimpsonsCacheService);

  // Convertimos el parámetro de ruta a número.
  private characterId = Number(this.route.snapshot.paramMap.get('id'));

  // Resource reactivo: expone isLoading, error y value para el template.
  characterResource = rxResource({
    stream: () => {
      // Paso A: buscar primero en caché local.
      const cached = this.cacheService.getById(this.characterId);
      if (cached) {
        // Si existe en localStorage, devolvemos el dato al instante.
        return of(cached);
      }

      // Paso B: si no existe en caché, consultar API.
      return this.simpsonsService.getCharacterById(this.characterId).pipe(
        // Guardamos la respuesta para visitas futuras.
        tap((character) => this.cacheService.save(character))
      );
    },
  });

  // authService como publico para poder leerlo en el template con authService.currentUser().
  authService = inject(AuthService);
  private favoritesService = inject(FavoritesService);

  // Signal local: refleja inmediatamente si el personaje es favorito sin esperar Firestore.
  isFavorite = signal(false);
  // Signal para mostrar errores de Firestore en el template.
  favoriteError = signal<string | null>(null);

  constructor() {
    // Cargamos el estado inicial del favorito desde Firestore al abrir la página.
    const uid = this.authService.uid;
    if (uid) {
      this.favoritesService
        .getFavoritesByUser(uid)
        .subscribe((favorites) => {
          const found = favorites.some((f) => f.characterId === this.characterId);
          this.isFavorite.set(found);
        });
    }
  }

  // Alterna entre guardar y eliminar segun el estado actual del signal.
  toggleFavorite() {
    const uid = this.authService.uid;
    if (!uid) return; // No hace nada si no hay sesion activa.

    this.favoriteError.set(null); // Limpiamos error previo.

    if (this.isFavorite()) {
      // Si ya es favorito, lo eliminamos de Firestore.
      this.favoritesService
        .removeFavorite(uid, this.characterId)
        .then(() => this.isFavorite.set(false))
        .catch((err) => {
          console.error('Error al eliminar favorito:', err);
          this.favoriteError.set('No se pudo eliminar el favorito. Revisa las reglas de Firestore.');
        });
    } else {
      // Si no es favorito, lo guardamos en Firestore.
      this.favoritesService
        .addFavorite(uid, this.characterId)
        .then(() => this.isFavorite.set(true))
        .catch((err) => {
          console.error('Error al guardar favorito:', err);
          this.favoriteError.set('No se pudo guardar el favorito. Revisa las reglas de Firestore.');
        });
    }
  }
}
