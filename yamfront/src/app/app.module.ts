import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/shared/card/card.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { ContentMenuComponent } from './components/shared/content-menu/content-menu.component';
import { CamionComponent } from './components/pages/camion/camion.component';
import { SideMenuComponent } from './components/shared/side-menu/side-menu.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptorService} from "./services/api/token-interceptor.service";
import { LoginComponent } from './components/pages/auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './components/pages/layout/home/home.component';
import { CardChauffeurComponent } from './components/shared/card-chauffeur/card-chauffeur.component';
import { ChauffeurComponent } from './components/pages/chauffeur/chauffeur.component';
import {FilterPipe} from "./services/pipes/filter.pipe";
import { LoaderComponent } from './components/shared/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ModalComponent,
    ContentMenuComponent,
    CamionComponent,
    SideMenuComponent,
    LoginComponent,
    HomeComponent,
    CardChauffeurComponent,
    ChauffeurComponent,
    FilterPipe,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
