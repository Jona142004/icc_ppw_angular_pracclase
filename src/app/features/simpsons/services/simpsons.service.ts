import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  catchError,
  delay,
  map,
  tap,
  throwError,
  timeout,
} from 'rxjs';
import { SimpsonsCharacter, SimpsonsResponse } from '../models/simpsons.interface';
import { environment } from '../../../../environments/environment';

export interface Options {
  page?: number;
  limit?: number;
}

@Injectable({ providedIn: 'root' })
export class SimpsonsService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  // Devuelve un Observable tipado; no hace la llamada hasta que alguien se suscribe.
  getCharacters(page: number = 1): Observable<SimpsonsResponse> {
    return this.http
      .get<SimpsonsResponse>(`${this.baseUrl}/characters?page=${page}`)
      .pipe(
        tap((response) => {
          console.log('Simpsons API response:', response);
        }),
        catchError(() =>
          throwError(() => new Error('No se pudieron cargar los personajes'))
        )
      );
  }

  // Método flexible con opciones de paginación — usado en 07-B.
  getCharactersOptions(options: Options = {}): Observable<SimpsonsResponse> {
    const { page = 1, limit = 10 } = options;
    return this.http
      .get<SimpsonsResponse>(
        `${this.baseUrl}/characters?page=${page}&limit=${limit}`
      )
      .pipe(
        catchError(() =>
          throwError(() => new Error('No se pudieron cargar los personajes'))
        )
      );
  }

  getCharacterById(id: number): Observable<SimpsonsCharacter> {
    return this.http
      .get<SimpsonsCharacter>(`${this.baseUrl}/characters/${id}`)
      .pipe(
        delay(300),
        timeout(5000),
        tap((character) => {
          console.log('Character loaded:', character.name);
        }),
        map((character) => ({
          ...character,
          occupation: character.occupation || 'Sin ocupacion registrada',
        })),
        catchError(() =>
          throwError(() => new Error('No se pudo cargar el personaje'))
        )
      );
  }
}
