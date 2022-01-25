import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {CamionComponent} from "./components/pages/camion/camion.component";
import {LoginComponent} from "./components/pages/auth/login/login.component";
import {HomeComponent} from "./components/pages/layout/home/home.component";
import {ChauffeurComponent} from "./components/pages/chauffeur/chauffeur.component";
import {ClientComponent} from "./components/pages/client/client.component";
import {CourseComponent} from "./components/pages/course/course.component";

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'login',component: LoginComponent},
  {
    path: '', component: HomeComponent,
    children: [
      {path: 'camion', component: CamionComponent},
      {path: 'chauffeur', component: ChauffeurComponent},
      {path: 'client', component: ClientComponent},
      {path: 'course', component: CourseComponent},
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
