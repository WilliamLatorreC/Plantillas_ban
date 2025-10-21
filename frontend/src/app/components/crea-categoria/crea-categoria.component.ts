import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { PlantillaService } from '../../services/plantilla.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crea-categoria',
  imports: [CommonModule, FormsModule],
  templateUrl: './crea-categoria.component.html',
  styleUrl: './crea-categoria.component.css'
})
export class CreaCategoriaComponent implements OnInit{
  categoria = { nombre: '', descripcion: '', plantillas: [] as string[] };
  plantillas: any[] = [];
  mensaje: string = '';

  constructor(
    private categoriaService: CategoriaService,
    private plantillaService: PlantillaService
  ) {}

  ngOnInit() {
    this.plantillaService.getPlantillas().subscribe({
      next: (data) => (this.plantillas = data),
      error: () => (this.mensaje = 'Error al cargar plantillas')
    });
  }

  // ✅ Método correcto
  togglePlantilla(id: string) {
    const index = this.categoria.plantillas.indexOf(id);
    if (index === -1) {
      this.categoria.plantillas.push(id);
    } else {
      this.categoria.plantillas.splice(index, 1);
    }
  }

  // ✅ Método correcto (nombre igual que en el HTML)
  guardarCategoria() {
    if (!this.categoria.nombre.trim()) {
      this.mensaje = 'Por favor ingresa un nombre para la categoría';
      return;
    }

    this.categoriaService.crearCategoria(this.categoria).subscribe({
      next: () => {
        this.mensaje = '✅ Categoría creada correctamente';
        this.categoria = { nombre: '', descripcion: '', plantillas: [] };
      },
      error: (err) => {
        console.error(err);
        this.mensaje = '❌ Error al crear la categoría';
      }
    });
  }
}
