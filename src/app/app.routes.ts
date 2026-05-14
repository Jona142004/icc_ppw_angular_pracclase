import { Route } from "@angular/router";
import { HomePage } from "./features/home/pages/home-page/home-page";
import { StudentsPage } from "./features/students/pages/students-page/students-page";
import { StudentsDetailPage } from "./features/students/pages/students-detail-page/students-detail-page";

export const routes: Route[] = [ 
  { path: "", component: HomePage },
  { path: "students", component: StudentsPage },
  { path: "students/:id", component: StudentsDetailPage },

  //redireccionamiento 
  {path: '**' , redirectTo: ''}
];

