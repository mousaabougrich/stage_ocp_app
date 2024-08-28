import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import {NgModule} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpClientModule} from "@angular/common/http";
import { routes } from './app.routes';
import {CollaborateursComponent} from "./collaborateurs/collaborateurs.component";
import {ReactiveFormsModule} from "@angular/forms";
import {provideHttpClient} from "@angular/common/http";
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient()]
};
