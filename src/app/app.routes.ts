import { Route } from "@angular/router";
import { HomePage } from "./features/home/pages/home-page/home-page";
import { StudentsPage } from "./features/students/pages/students-page/students-page";
import { StudentsDetailPage } from "./features/students/pages/students-detail-page/students-detail-page";
import { LayoutsPage } from './features/layouts-page/layouts-page';
import { SignupPage } from "./features/signup-page/signup-page";
import { SimpsonsPage } from "./features/simpsons/pages/simpsons-page/simpsons-page";
import { SimpsonDetailPage } from "./features/simpsons/pages/simpson-detail-page/simpson-detail-page";
import { AuthPage } from './features/auth/pages/auth-page/auth-page';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Route[] = [
  // Publica
  { path: "", component: HomePage },

  // Solo visitantes
  { path: 'auth', component: AuthPage, canActivate: [guestGuard] },

  // Autenticadas generales
  { path: "students", component: StudentsPage, canActivate: [authGuard] },
  { path: "students/:id", component: StudentsDetailPage, canActivate: [authGuard] },
  { path: "layouts", component: LayoutsPage, canActivate: [authGuard] },
  { path: "signup", component: SignupPage, canActivate: [authGuard] },
  { path: 'profile', loadComponent: () => import('./features/profile/pages/profile-page'), canActivate: [authGuard] },
  { path: 'project-config', loadComponent: () => import('./features/project/pages/project-config-page'), canActivate: [authGuard] },
  { path: 'ui-components', loadComponent: () => import('./features/ui-components/pages/ui-components-page/ui-components-page'), canActivate: [authGuard] },

  // Solo admins (requiere custom claim role: 'admin' en Firebase)
  { path: 'simpsons', component: SimpsonsPage, canActivate: [adminGuard] },
  { path: 'simpsons/:id', component: SimpsonDetailPage, canActivate: [adminGuard] },

  { path: '**', redirectTo: '' },
];

