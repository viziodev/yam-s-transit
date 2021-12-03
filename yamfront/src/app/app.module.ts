import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/shared/card/card.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { ContentMenuComponent } from './components/shared/content-menu/content-menu.component';
import { CamionComponent } from './components/pages/camion/camion.component';
import { SideMenuComponent } from './components/shared/side-menu/side-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ModalComponent,
    ContentMenuComponent,
    CamionComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
