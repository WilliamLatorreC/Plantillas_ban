import { Component } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environment';

interface Plantilla {
  id?: number;
  nombre: string;
  producto: string;
  contenido: string;
  abierta?: boolean;
}

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NgIf, NgFor],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent {
  nombre = '';
  producto = '';
  plantillaGenerada = '';
  plantillas: Plantilla[] = [];
  guionSeleccionado: any;

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.guionSeleccionado = this.guiones[0];
    this.obtenerPlantillas(); // cargar desde BD
  }

  guiones = [
    {
      id: 1,
      nombre: '🛍️ Guion de bienvenida Mesa',
      contenido: `Buen día. Bienvenid@ a la mesa de servicios Sarita.
Mi nombre es [Nombre del agente]. ¿Cómo puedo ayudarle hoy?

Validación de datos:
- Nombres y apellidos
- Usuario de red`
    },
    {
      id: 2,
      nombre: '🙏 Guion de Bienvenida Libranza',
      contenido: `Buen día. Bienvenid@ a la mesa de servicios Sarita para libranza.
Mi nombre es [Nombre del agente]. ¿Cómo puedo ayudarle hoy?`
    },
    {
      id: 3,
      nombre: '🔔 Chequeo de conformidad',
      contenido: `¿Puedo ayudarle en algo más?
¿Le puedo colaborar en algo más?

Indicar el número del servicio:
- El número de su servicio es XXXXXX
- Le confirmo el número de radicado o caso XXXXXXX`
    }
  ];

  obtenerPlantillas() {
    this.http.get<Plantilla[]>(`${this.apiUrl}/plantillas`).subscribe({
      next: (data) => (this.plantillas = data),
      error: (err) => console.error('Error al cargar plantillas', err)
    });
  }

  generarPlantilla(event: Event) {
    event.preventDefault();
    this.http.post<{ plantilla: string }>(
      `${this.apiUrl}/generate-template`,
      { nombre: this.nombre, producto: this.producto }
    ).subscribe({
      next: (res) => this.plantillaGenerada = res.plantilla,
      error: (err) => {
        console.error('Error al generar plantilla', err);
        alert('❌ Error al generar plantilla.');
      }
    });
  }

  guardarPlantilla() {
    if (!this.plantillaGenerada.trim()) return;

    const nueva: Plantilla = {
      nombre: this.nombre,
      producto: this.producto,
      contenido: this.plantillaGenerada
    };

    this.http.post(`${this.apiUrl}/plantillas`, nueva).subscribe({
      next: () => {
        alert('✅ Plantilla guardada correctamente');
        this.resetFormulario();
        this.obtenerPlantillas();
      },
      error: (err) => console.error('Error al guardar', err)
    });
  }

  eliminarPlantilla(id?: number) {
    if (!id) return;
    if (!confirm('¿Eliminar esta plantilla?')) return;

    this.http.delete(`${this.apiUrl}/plantillas/${id}`).subscribe({
      next: () => this.obtenerPlantillas(),
      error: (err) => console.error('Error al eliminar', err)
    });
  }

  resetFormulario() {
    this.plantillaGenerada = '';
    this.nombre = '';
    this.producto = '';
  }

  toggleFAQ(index: number) {
    this.plantillas[index].abierta = !this.plantillas[index].abierta;
  }
}
