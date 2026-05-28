import { inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "@angular/fire/auth";
import { from } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  // authState emite null cuando no hay sesion, o el objeto User cuando hay sesion.
  // toSignal convierte el Observable en un signal reactivo para usar en templates.
  currentUser = toSignal(authState(this.auth));

  // signInWithEmailAndPassword devuelve una Promise.
  // from() la convierte en Observable para poder encadenar operadores RxJS o usar con rxResource.
  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // Igual que login, se convierte la Promise a Observable.
  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return from(signOut(this.auth));
  }

  // Acceso rapido al uid del usuario actual (null si no esta autenticado).
  get uid(): string | null {
    return this.currentUser()?.uid ?? null;
  }
}