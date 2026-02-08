import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http'; // Importación necesaria

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [], // <--- DEJA ESTO VACÍO. AppComponent y ContactComponent son Standalone.
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppComponent,      // <--- IMPÓRTALOS AQUÍ como si fueran módulos
    ContactComponent   // <--- IMPÓRTALOS AQUÍ
  ],
  providers: [
    provideHttpClient() // Ahora sí encontrará el nombre
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }