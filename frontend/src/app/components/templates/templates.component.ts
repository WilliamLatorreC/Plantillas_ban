import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment'; // ✅ asegúrate de que esta ruta sea correcta

interface Plantilla {
  _id?: string;
  nombre: string;
  producto: string;
  contenido: string;
  abierta?: boolean;
}

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent {
  // ===== VARIABLES =====
  nombre = '';
  descripcion = '';
  producto = '';
  plantillaGenerada = '';
  plantillas: Plantilla[] = [];
  plantillaSeleccionada: Plantilla | null = null;
  busqueda: string = ''; // ✅ Campo para filtrar

  private apiUrl = environment.apiUrl;

  plantillasFiltradas: Plantilla[] = [];

  constructor(private http: HttpClient) {
    this.obtenerPlantillas();
  }

  // ===== OBTENER PLANTILLAS =====
  obtenerPlantillas(): void {
    this.http.get<Plantilla[]>(`${this.apiUrl}/plantillas`).subscribe({
      next: (res) => {
        this.plantillas = res;
        console.log('✅ Plantillas cargadas:', res);
      },
      error: (err) => {
        console.error('❌ Error al cargar plantillas', err);
        alert('Error al cargar plantillas. Verifica la conexión con el backend.');
      }
    });
  }

  // ===== GENERAR PLANTILLA =====
  generarPlantilla(event: Event): void {
    event.preventDefault();

    if (!this.nombre.trim() || !this.producto.trim()) {
      alert('Por favor completa todos los campos.');
      return;
    }

    this.http.post<{ plantilla: string }>(
      `${this.apiUrl}/generate-template`,
      { nombre: this.nombre, producto: this.producto }
    ).subscribe({
      next: (res) => {
        this.plantillaGenerada = res.plantilla;
      },
      error: (err) => {
        console.error('❌ Error al generar plantilla', err);
        alert('No se pudo generar la plantilla. Verifica la conexión.');
      }
    });
  }

  // ===== GUARDAR PLANTILLA =====
  guardarPlantilla(): void {
    if (!this.plantillaGenerada.trim()) {
      alert('No hay plantilla para guardar.');
      return;
    }

    const nueva: Plantilla = {
      nombre: this.nombre,
      producto: this.producto,
      contenido: this.plantillaGenerada
    };

    this.http.post(`${this.apiUrl}/plantillas`, nueva).subscribe({
      next: () => {
        alert('✅ Plantilla guardada correctamente');
        this.obtenerPlantillas();
        this.resetFormulario();
      },
      error: (err) => {
        console.error('❌ Error al guardar plantilla', err);
        alert('Error al guardar la plantilla.');
      }
    });
  }

  // ===== EDITAR PLANTILLA =====
  editarPlantilla(plantilla: Plantilla | null): void {
    if (!plantilla) return;
    this.plantillaSeleccionada = { ...plantilla };
    this.nombre = plantilla.nombre;
    this.producto = plantilla.producto;
    this.plantillaGenerada = plantilla.contenido;
  }

  actualizarPlantilla(): void {
    if (!this.plantillaSeleccionada || !this.plantillaSeleccionada._id) {
      alert('No hay plantilla seleccionada para actualizar.');
      return;
    }

    this.http.put(
      `${this.apiUrl}/plantillas/${this.plantillaSeleccionada._id}`,
      {
        nombre: this.nombre,
        producto: this.producto,
        contenido: this.plantillaGenerada
      }
    ).subscribe({
      next: () => {
        alert('✅ Plantilla actualizada correctamente');
        this.obtenerPlantillas();
        this.resetFormulario();
        this.plantillaSeleccionada = null;
      },
      error: (err) => {
        console.error('❌ Error al actualizar plantilla', err);
        alert('Error al actualizar plantilla.');
      }
    });
  }

  // ===== ELIMINAR PLANTILLA =====
  eliminarPlantilla(id: string | undefined): void {
    if (!id) return;
    if (!confirm('¿Seguro que deseas eliminar esta plantilla?')) return;

    this.http.delete(`${this.apiUrl}/plantillas/${id}`).subscribe({
      next: () => {
        alert('🗑️ Plantilla eliminada correctamente');
        this.obtenerPlantillas();
      },
      error: (err) => {
        console.error('❌ Error al eliminar plantilla', err);
        alert('Error al eliminar la plantilla.');
      }
    });
  }

  // ===== UTILIDADES =====
  resetFormulario(): void {
    this.nombre = '';
    this.producto = '';
    this.plantillaGenerada = '';
  }

  togglePlantilla(index: number): void {
    this.plantillas[index].abierta = !this.plantillas[index].abierta;
  }

  // ===== FILTRO LOCAL =====
  get filtrarPlantillas(): Plantilla[] {
    if (!this.busqueda.trim()) return this.plantillas;
    return this.plantillas.filter(p =>
      p.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      p.producto.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

}
