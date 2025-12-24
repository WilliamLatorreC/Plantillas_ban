import { Routes } from '@angular/router';
import { TemplatesComponent } from './components/templates/templates.component';
import { CreateTemplatesComponent } from './components/create-templates/create-templates.component';
import { ListTemplatesComponent } from './components/list-templates/list-templates.component';
import { CreaCategoriaComponent } from './components/crea-categoria/crea-categoria.component';
import { CrearUsuariosComponent } from './components/crear-usuarios/crear-usuarios.component';
//import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { FlujoComponent } from './components/flujo/flujo.component';

export const routes: Routes = [
      { path: '', component: TemplatesComponent, canActivate: [AuthGuard] },
      { path: 'crear-plantilla', component: CreateTemplatesComponent, canActivate: [AuthGuard] },
      { path: 'lista-plantillas', component: ListTemplatesComponent, canActivate: [AuthGuard]  },
      { path: 'categorias', component: CreaCategoriaComponent, canActivate: [AuthGuard] },  
      { path: 'crear-usuarios', component: CrearUsuariosComponent, canActivate: [AuthGuard] },  
      { path: 'flujo', component: FlujoComponent, canActivate: [AuthGuard] },      
      { path: 'login', component: LoginComponent},   
      { path: '**', redirectTo: '', canActivate: [AuthGuard] }
];
