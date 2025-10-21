import { Routes } from '@angular/router';
import { TemplatesComponent } from './components/templates/templates.component';
import { CreateTemplatesComponent } from './components/create-templates/create-templates.component';
import { ListTemplatesComponent } from './components/list-templates/list-templates.component';
import { CreaCategoriaComponent } from './components/crea-categoria/crea-categoria.component';

export const routes: Routes = [
      { path: '', component: TemplatesComponent },
      { path: 'crear-plantilla', component: CreateTemplatesComponent },
      { path: 'lista-plantillas', component: ListTemplatesComponent },
      { path: 'categorias', component: CreaCategoriaComponent },
      { path: '**', redirectTo: '' }
];
