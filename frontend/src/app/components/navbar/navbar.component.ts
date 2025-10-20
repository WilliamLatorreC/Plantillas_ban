import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
  <nav class="navbar">
    <div class="navbar-content">
      <button class="btn" (click)="ir('/')">Inicio</button>
      <button class="btn btn-secondary" (click)="ir('/crear-plantilla')">Crear Plantilla</button>
    </div>
  </nav>
  `,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  // Función para navegar
  ir(ruta: string) {
    if (!ruta) return; // prevención opcional
    this.router.navigate([ruta]);
  }
}
