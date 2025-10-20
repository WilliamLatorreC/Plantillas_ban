import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Necesario para [(ngModel)]
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterOutlet],
  template: `
    <app-navbar></app-navbar>
    <div class="container mt-3">
      <router-outlet></router-outlet>
    </div>
  `,
})

export class AppComponent {
  title = 'Templates-Ban';
}

