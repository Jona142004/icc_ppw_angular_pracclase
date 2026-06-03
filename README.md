# PPW Angular — Programación y Plataformas Web

Proyecto incremental de la materia **Programación y Plataformas Web** usando Angular 21 + Firebase.

---

## Stack

| Tecnología | Versión |
|---|---|
| Angular | 21.2.0 |
| AngularFire | 20.0.1 |
| Firebase | 12.13.0 |
| Tailwind CSS | 4.3.0 |
| DaisyUI | 5.5.20 |
| RxJS | 7.8.0 |
| TypeScript | 5.9.2 |
| Vitest | 4.0.8 |
| pnpm | 10.x |

---

## Estructura del proyecto

```
src/app/
├── app.ts / app.routes.ts / app.config.ts
├── components/
│   ├── app-header/        # Navbar responsivo con auth
│   ├── app-footer/
│   └── app-hero/
├── core/
│   ├── services/
│   │   ├── auth.service.ts       # Firebase Auth
│   │   └── favorites.ts          # Firestore CRUD
│   └── guards/
│       ├── auth.guard.ts         # Rutas privadas
│       ├── guest.guard.ts        # Bloquea /auth si hay sesion
│       └── admin.guard.ts        # Solo custom claim admin
├── features/
│   ├── auth/pages/auth-page/     # Login + Registro + Google
│   ├── home/pages/home-page/
│   ├── students/pages/           # Lista y detalle de estudiantes
│   ├── simpsons/                 # API + cache + favoritos (solo admin)
│   ├── signup-page/              # Formulario reactivo con validadores
│   ├── profile/pages/            # Formulario de perfil
│   ├── project/pages/            # Configuracion de proyecto
│   ├── ui-components/pages/      # Vitrina de componentes DaisyUI
│   └── layouts-page/
└── shared/
    ├── services/pagination.service.ts
    └── utils/form-utils.ts
```

---

## Rutas y proteccion

| Ruta | Guard | Acceso |
|---|---|---|
| `/` | — | Publico |
| `/auth` | `guestGuard` | Solo visitantes — redirige a `/` si hay sesion |
| `/students` | `authGuard` | Autenticados |
| `/students/:id` | `authGuard` | Autenticados |
| `/profile` | `authGuard` | Autenticados |
| `/signup` | `authGuard` | Autenticados |
| `/layouts` | `authGuard` | Autenticados |
| `/ui-components` | `authGuard` | Autenticados |
| `/project-config` | `authGuard` | Autenticados (lazy) |
| `/simpsons` | `adminGuard` | Solo rol admin |
| `/simpsons/:id` | `adminGuard` | Solo rol admin |

---

## Practicas implementadas

### Practica 03 — Navegacion y rutas
- Configuracion de `app.routes.ts` con rutas basicas
- Navegacion con `RouterLink` y `RouterLinkActive`
- Parametros de ruta con `ActivatedRoute` (`/students/:id`)
- Header responsivo con menu hamburguesa mobile

### Practica 07 — Simpsons API + Signals + Cache
- `SimpsonsService`: consumo de API REST con `HttpClient`
- `SimpsonsCacheService`: persistencia en `localStorage` (read-first pattern)
- `rxResource` para manejar estados de carga/error/valor en templates
- `PaginationService`: sincroniza pagina actual con query params (`?page=N`)
- Lista paginada con 10 personajes por pagina
- Detalle de personaje con imagen, ocupacion, genero, edad y estado

### Practica 08 — Firebase Authentication + Firestore
- Instalacion y configuracion de `@angular/fire`
- **AuthService**: signal `user` con 3 estados (`undefined` = cargando, `null` = sin sesion, `User` = autenticado)
- Login con email/password — `signInWithEmailAndPassword`
- Registro — `createUserWithEmailAndPassword`
- **Login con Google** — `signInWithPopup` + `GoogleAuthProvider`
- Logout — `signOut`
- Pagina `/auth` unificada: un formulario alterna entre login y registro con signal `isLogin`
- Header reactivo: muestra email del usuario o boton de login segun estado de sesion
- **FavoritesService**: persistencia de personajes favoritos en Firestore
  - `addFavorite` / `removeFavorite` via `setDoc` / `deleteDoc`
  - ID de documento: `favorites/{userId}-{characterId}` (unico por usuario)
  - `getFavoritesByUser` retorna Observable con `collectionData`
- Boton de favorito en detalle de personaje (solo visible para autenticados)

### Practica 09 — Guards y seguridad de rutas
- **authGuard**: usa `authState(auth).pipe(take(1))` para esperar el estado real de Firebase; redirige anonimos a `/auth`
- **guestGuard**: bloquea `/auth` cuando ya hay sesion; redirige a `/`
- **adminGuard**: verifica custom claim `role: 'admin'` via `user.getIdTokenResult()`; sin sesion → `/auth`; sesion sin claim admin → `/`
- `role` computed en `AuthService` por email (demo de UI): `admin@ups.edu.ec` = admin
- Enlace "Simpsons" en el navbar visible solo cuando `role() === 'admin'`

### Formularios reactivos
- **SignupPage**: email, password, confirmar password
  - Validador personalizado `passwordMatchValidator` (cross-field)
  - Validador asincrono de disponibilidad de email
- **ProfilePage**: nombre (minLength 3), edad (min 18), email
  - `FormUtils` helper con mensajes de error en espanol
- Validacion visual con clase `input-error` de DaisyUI

---

## Autenticacion — flujo completo

```
Usuario anonimo
  └─ abre ruta privada → authGuard → redirige a /auth
  └─ se registra o loguea (email/password o Google)
  └─ Firebase emite User → signal user() se actualiza
  └─ redirige a /

Usuario autenticado (user)
  └─ accede a rutas con authGuard
  └─ NO ve enlace Simpsons en el navbar
  └─ adminGuard bloquea /simpsons → redirige a /

Usuario autenticado (admin)
  └─ email == admin@ups.edu.ec → rol "admin" (demo de UI)
  └─ ve enlace Simpsons en el navbar
  └─ adminGuard valida custom claim role: 'admin' en Firebase

Logout
  └─ signOut() → authState emite null
  └─ header muestra boton "Iniciar sesion"
  └─ redirige a /auth
```

> Para asignar custom claims en produccion: crear `tools/set-role.ts` con Firebase Admin SDK
> y ejecutar `pnpm tsx tools/set-role.ts` con credenciales de cuenta de servicio.

---

## Instalacion y ejecucion

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm start        # http://localhost:4200

# Build de produccion
pnpm build

# Tests
pnpm test
```

---

## Configuracion Firebase

- **Authentication**: Email/Password + Google habilitados
- **Firestore**: coleccion `favorites` con documentos `{userId}-{characterId}`
- **Reglas Firestore** (desarrollo — solo usuarios autenticados):

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## Patrones clave

| Patron | Donde se usa |
|---|---|
| Signals + computed | `AuthService.user`, `AuthService.role`, header |
| `toSignal` con `initialValue: undefined` | Estado async de Firebase (3 fases: cargando/null/User) |
| `rxResource` | Lista y detalle de Simpsons |
| `authState().pipe(take(1))` | Guards async (evita decisiones antes de que Firebase responda) |
| Standalone components | Toda la app (sin NgModule) |
| `OnPush` change detection | Todas las paginas |
| Lazy loading (`loadComponent`) | `/profile`, `/project-config`, `/ui-components` |
| Read-first cache | `SimpsonsCacheService` con localStorage |
| `from()` Promise → Observable | Todos los metodos de `AuthService` |

---

## Autor

**Jonatha Hola** — jonnathanhola17@gmail.com  
Docente: **Pablo Torres** — ptorresp@ups.edu.ec
