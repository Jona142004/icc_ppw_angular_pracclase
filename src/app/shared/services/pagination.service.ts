import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  private activatedRoute = inject(ActivatedRoute);

  // Convierte el query param ?page= en un signal reactivo con valor inicial 1.
  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map(params => Number(params.get('page') ?? '1'))
    ),
    { initialValue: 1 }
  );
}
