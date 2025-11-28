import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterOutlet],
  template: `
    <app-navbar *ngIf="mostrarNav"></app-navbar>

    <div class="container mt-3">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  title = 'Templates-Ban';

  mostrarNav = true;

  constructor(private router: Router) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;

        // Ocultar nav solo en login
        this.mostrarNav = url !== '/login';
      });
  }
}
