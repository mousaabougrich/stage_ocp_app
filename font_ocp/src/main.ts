import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../../../IdeaProjects/untitled3/src/app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule, HttpClientModule, FormsModule, RouterModule)
  ]
});
