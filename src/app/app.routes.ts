import { Route } from "@angular/router";
import { HomePage } from "./features/home/pages/home-page/home-page";
import { StudentsPage } from "./features/students/pages/students-page/students-page";
import { StudentsDetailPage } from "./features/students/pages/students-detail-page/students-detail-page";
import { LayoutsPage } from './features/layouts-page/layouts-page';
import { SignupPage } from "./features/signup-page/signup-page";
import { SimpsonsPage } from "./features/simpsons/pages/simpsons-page/simpsons-page";
import { SimpsonDetailPage } from "./features/simpsons/pages/simpson-detail-page/simpson-detail-page";
import { AuthPage } from './features/auth/pages/auth-page/auth-page';


export const routes: Route[] = [
  { path: "", component: HomePage },
  { path: "students", component: StudentsPage },
  { path: "students/:id", component: StudentsDetailPage },
  { path: "layouts", component: LayoutsPage },
  { path: "signup", component: SignupPage },
  { path: 'profile', loadComponent: () => import('./features/profile/pages/profile-page') },
  { path: 'project-config', loadComponent: () => import('./features/project/pages/project-config-page') },
  { path: 'ui-components', loadComponent: () => import('./features/ui-components/pages/ui-components-page/ui-components-page') },
  { path: 'simpsons', component: SimpsonsPage },
  { path: 'simpsons/:id', component: SimpsonDetailPage },
  { path: 'auth', component: AuthPage},
  { path: '**', redirectTo: '' },
];

