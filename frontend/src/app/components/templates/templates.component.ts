import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
export class TemplatesComponent implements OnInit {
  plantillas: Plantilla[] = [];
  plantillaSeleccionada: Plantilla | null = null;
  busqueda: string = '';

  nombre = '';
  producto = '';
  plantillaGenerada = '';

  productos: string[] = [];
  productosAbiertos: { [key: string]: boolean } = {}; // Para controlar expansión

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerPlantillas();
  }

  obtenerPlantillas(): void {
    this.http.get<Plantilla[]>(`${this.apiUrl}/plantillas`).subscribe({
      next: (res) => {
        this.plantillas = res;
        this.productos = Array.from(new Set(res.map(p => p.producto)));
        this.productos.forEach(prod => this.productosAbiertos[prod] = false);
      },
      error: (err) => {
        console.error('Error al cargar plantillas', err);
        alert('Error al cargar plantillas');
      }
    });
  }

  toggleProducto(producto: string): void {
    this.productosAbiertos[producto] = !this.productosAbiertos[producto];
  }

  getPlantillasPorProducto(producto: string): Plantilla[] {
    return this.plantillas
      .filter(p => p.producto === producto)
      .filter(p =>
        p.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        p.producto.toLowerCase().includes(this.busqueda.toLowerCase())
      );
  }

  seleccionarPlantilla(plantilla: Plantilla) {
    this.plantillaSeleccionada = plantilla;
    this.nombre = plantilla.nombre;
    this.producto = plantilla.producto;
    this.plantillaGenerada = plantilla.contenido;
  }

  guardarPlantilla(): void {
    if (!this.nombre.trim() || !this.producto.trim() || !this.plantillaGenerada.trim()) {
      alert('Completa todos los campos');
      return;
    }

    const nueva: Plantilla = {
      nombre: this.nombre,
      producto: this.producto,
      contenido: this.plantillaGenerada
    };

    this.http.post(`${this.apiUrl}/plantillas`, nueva).subscribe({
      next: () => {
        alert('Plantilla guardada');
        this.obtenerPlantillas();
        this.resetFormulario();
      },
      error: (err) => {
        console.error('Error al guardar plantilla', err);
        alert('Error al guardar plantilla');
      }
    });
  }

  actualizarPlantilla(): void {
    if (!this.plantillaSeleccionada || !this.plantillaSeleccionada._id) return;

    const actualizada: Plantilla = {
      nombre: this.nombre,
      producto: this.producto,
      contenido: this.plantillaGenerada
    };

    this.http.put(`${this.apiUrl}/plantillas/${this.plantillaSeleccionada._id}`, actualizada)
      .subscribe({
        next: () => {
          alert('Plantilla actualizada');
          this.obtenerPlantillas();
          this.resetFormulario();
          this.plantillaSeleccionada = null;
        },
        error: (err) => {
          console.error('Error al actualizar plantilla', err);
          alert('Error al actualizar plantilla');
        }
      });
  }

  eliminarPlantilla(id: string | undefined): void {
    if (!id || !confirm('¿Deseas eliminar esta plantilla?')) return;

    this.http.delete(`${this.apiUrl}/plantillas/${id}`).subscribe({
      next: () => {
        alert('Plantilla eliminada');
        this.obtenerPlantillas();
        if (this.plantillaSeleccionada?._id === id) this.resetFormulario();
      },
      error: (err) => {
        console.error('Error al eliminar plantilla', err);
        alert('Error al eliminar plantilla');
      }
    });
  }

  resetFormulario(): void {
    this.nombre = '';
    this.producto = '';
    this.plantillaGenerada = '';
    this.plantillaSeleccionada = null;
  }
}
