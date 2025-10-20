import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CreateTemplatesComponent } from './app/components/create-templates/create-templates.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, FormsModule, ReactiveFormsModule)
  ]
}).catch(err => console.error(err));