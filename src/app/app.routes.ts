import { Route } from "@angular/router";
import { HomePage } from "./features/home/pages/home-page/home-page";
import { StudentsPage } from "./features/students/pages/students-page/students-page";
import { StudentsDetailPage } from "./features/students/pages/students-detail-page/students-detail-page";
import { LayoutsPage } from './features/layouts-page/layouts-page';
import { SignupPage } from "./features/signup-page/signup-page";

export const routes: Route[] = [
  { path: "", component: HomePage },
  { path: "students", component: StudentsPage },
  { path: "students/:id", component: StudentsDetailPage },
  { path: "layouts", component: LayoutsPage },
  { path: "signup", component: SignupPage },
  { path: 'profile', loadComponent: () => import('./features/profile/pages/profile-page') },
  //redireccionamiento 
  {path: '**' , redirectTo: ''}
];

