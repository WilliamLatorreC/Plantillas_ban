import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

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
  imports: [NgIf, FormsModule, CommonModule],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.css'
})
export class TemplatesComponent {
   nombre = '';
  producto = '';
  plantillaGenerada = '';
  plantillas: Plantilla[] = [];

  // ===== NUEVO: Plantillas predefinidas =====
  plantillasPredefinidas: Plantilla[] = [
    {
      id: 1,
      nombre: 'Envio de OTP',
      producto: 'Reporting OTP',
      contenido:
        'Buen dia. El cliente se comunica para el envio de la OTP, ya que al cliente no le llegaba a su telefono',
      abierta: false,
    },
    {
      id: 2,
      nombre: 'Envio de Link',
      producto: 'Reporting Aceptacion',
      contenido:
        'Buen dia. El cliente se comunica para el envio del link de aceptacion de documentos, ya que al cliente no le llegaba a su correo.',
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

  // ===== NUEVO: Guiones predefinidos =====
  guiones = [
    {
      id: 1,
      nombre: '🛍️ Guion de bienvenida Mesa',
      contenido: `Buen dia Bienvenid@ a la mesa de servicios Sarita.
      Mi nombre es [Nombre del agente] ¿Como puedo ayudarle hoy?
      
      Validacion de datos:
      - Nombres y apellidos
      - usuario de red
      `
    },
    {
      id: 2,
      nombre: '🙏 Guion de Bienvenida Libranza',
      contenido: `Buen dia Bienvenid@ a la mesa de servicios Sarita para libranza.
      Mi nombre es [Nombre del agente] ¿Como puedo ayudarle hoy?`
    },
    {
      id: 3,
      nombre: '🔔 Chequeo de conformmidad',
      contenido: `¿Puedo ayudarle en algo mas?
      ¿Le puedo colaborar en algo mas?
      
      Indicar el numero del servicio
      - El numero de su servicios es XXXXXX
      - Le confirmo el numero de radicado o caso XXXXXXX
      `
    }
  ];

  guionSeleccionado = this.guiones[0]; // Guion por defecto

  constructor() {
    // Inicializa las plantillas con las predefinidas
    this.plantillas = [...this.plantillasPredefinidas];
  }

  async generarPlantilla(event: Event) {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/generate-template', {
        nombre: this.nombre,
        producto: this.producto
      });
      this.plantillaGenerada = res.data.plantilla;
    } catch (err) {
      console.error(err);
    }
  }

  guardarPlantilla() {
    if (!this.plantillaGenerada) return;

    const nueva: Plantilla = {
      id: Date.now(),
      nombre: this.nombre,
      producto: this.producto,
      contenido: this.plantillaGenerada,
      abierta: false
    };

    this.plantillas.push(nueva);
    alert('✅ Plantilla guardada correctamente');
    this.plantillaGenerada = '';
    this.nombre = '';
    this.producto = '';
  }

  toggleFAQ(index: number) {
    this.plantillas[index].abierta = !this.plantillas[index].abierta;
  }
}
