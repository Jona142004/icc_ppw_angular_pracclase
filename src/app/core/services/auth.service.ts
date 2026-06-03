import { computed, inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Auth, authState, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "@angular/fire/auth";
import { from } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  // Tres estados: undefined = cargando, null = sin sesion, User = autenticado.
  // initialValue: undefined evita decisiones prematuras antes de que Firebase responda.
  user = toSignal<User | null | undefined>(authState(this.auth), {
    initialValue: undefined,
  });

  // SOLO DEMO EN CLASE: rol por correo para pruebas de UI sin custom claims.
  // No usar como mecanismo de seguridad real.
  role = computed<'admin' | 'user' | null>(() => {
    const u = this.user();
    if (!u) return null;
    return u.email === 'admin@ups.edu.ec' ? 'admin' : 'user';
  });

  // signInWithEmailAndPassword devuelve una Promise.
  // from() la convierte en Observable para poder encadenar operadores RxJS o usar con rxResource.
  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // Igual que login, se convierte la Promise a Observable.
  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  logout() {
    return from(signOut(this.auth));
  }

  // Acceso rapido al uid del usuario actual (null si no esta autenticado).
  get uid(): string | null {
    return this.user()?.uid ?? null;
  }
}