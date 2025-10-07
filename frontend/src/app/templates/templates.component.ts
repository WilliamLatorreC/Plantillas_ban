import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environment'; // ✅ asegúrate de que esta ruta es correcta

interface Plantilla {
  id: number;
  nombre: string;
  producto: string;
  contenido: string;
  abierta?: boolean;
}

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule, HttpClientModule],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent {
  // ===== VARIABLES =====
  nombre = '';
  producto = '';
  plantillaGenerada = '';
  plantillas: Plantilla[] = [];
  guionSeleccionado: any;

  private apiUrl = environment.apiUrl; // ✅ se ajusta automáticamente según el entorno

  constructor(private http: HttpClient) {
    // Inicializa las plantillas
    this.plantillas = [...this.plantillasPredefinidas];
    this.guionSeleccionado = this.guiones[0];
  }

  // ===== PLANTILLAS PREDEFINIDAS =====
  plantillasPredefinidas: Plantilla[] = [
    {
      id: 1,
      nombre: 'Envio de OTP',
      producto: 'Reporting OTP',
      contenido:
        'Buen día. El cliente se comunica para el envío de la OTP, ya que al cliente no le llegaba a su teléfono.',
      abierta: false,
    },
    {
      id: 2,
      nombre: 'Envio de Link',
      producto: 'Reporting Aceptación',
      contenido:
        'Buen día. El cliente se comunica para el envío del link de aceptación de documentos, ya que al cliente no le llegaba a su correo.',
      abierta: false,
    },
    {
      id: 3,
      nombre: 'Desbloqueo Usuario',
      producto: 'Bizagi',
      contenido:
        'El usuario se comunica indicando que no se puede autenticar en Bizagi, ya que cuenta con la clave expirada o usuario bloqueado.',
      abierta: false,
    },
  ];

  // ===== GUIONES PREDEFINIDOS =====
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

  // ===== GENERAR PLANTILLA =====
  generarPlantilla(event: Event) {
    event.preventDefault();
    this.http.post<{ plantilla: string }>(
      `${this.apiUrl}/generate-template`,
      { nombre: this.nombre, producto: this.producto }
    ).subscribe({
      next: (res) => {
        this.plantillaGenerada = res.plantilla;
      },
      error: (err) => {
        console.error('Error al generar plantilla', err);
        alert('❌ No se pudo generar la plantilla. Verifica la conexión con el servidor.');
      }
    });
  }

  // ===== GUARDAR PLANTILLA =====
  guardarPlantilla() {
    if (!this.plantillaGenerada.trim()) return;

    const nueva: Plantilla = {
      id: Date.now(),
      nombre: this.nombre,
      producto: this.producto,
      contenido: this.plantillaGenerada,
      abierta: false
    };

    this.plantillas.push(nueva);
    alert('✅ Plantilla guardada correctamente');
    this.resetFormulario();
  }

  // ===== UTILIDAD =====
  resetFormulario() {
    this.plantillaGenerada = '';
    this.nombre = '';
    this.producto = '';
  }

  toggleFAQ(index: number) {
    this.plantillas[index].abierta = !this.plantillas[index].abierta;
  }
}
