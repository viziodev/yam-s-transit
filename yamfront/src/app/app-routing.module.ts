import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {CamionComponent} from "./components/pages/camion/camion.component";
const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {path: '', component: AppComponent,
    children: [
      {path: 'camion', component: CamionComponent},
    ]
  },]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
