import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { from, map, of, switchMap, take } from 'rxjs';

// Requiere custom claim { role: 'admin' } asignado via Firebase Admin SDK.
export const adminGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    take(1),
    switchMap(user => {
      if (!user) return of(router.createUrlTree(['/auth']));

      return from(user.getIdTokenResult()).pipe(
        map(token => {
          const role = token.claims['role'];
          return role === 'admin' ? true : router.createUrlTree(['/']);
        })
      );
    })
  );
};
