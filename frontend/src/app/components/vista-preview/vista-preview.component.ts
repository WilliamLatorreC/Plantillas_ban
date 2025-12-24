import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vista-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-preview.component.html',
  styleUrls: ['./vista-preview.component.css']
})
export class VistaPreviewComponent {
  @Input() cliente: any;
  @Input() plantilla: any;

  get contenidoProcesado(): string {
    if (!this.cliente || !this.plantilla) return '';

    let contenido = this.plantilla.contenido;

    Object.keys(this.cliente).forEach(key => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      contenido = contenido.replace(regex, this.cliente[key] ?? '');
    });

    return contenido;
  }
}
