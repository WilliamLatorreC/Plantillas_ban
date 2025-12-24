import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { PlantillaService } from '../../services/plantilla.service';

@Component({
  selector: 'app-crea-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crea-categoria.component.html',
  styleUrls: ['./crea-categoria.component.css']
})
export class CreaCategoriaComponent implements OnInit {
  categoria = { nombre: '', descripcion: '', tipo: '', plantillaId: '' };
  plantillas: any[] = [];
  plantillasAgrupadas: { producto: string; plantillas: any[] }[] = [];
  mensaje: string = '';

  filtro: string = '';
  dropdownAbierto = false;
  plantillaSeleccionada: any = null;

  constructor(
    private categoriaService: CategoriaService,
    private plantillaService: PlantillaService
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

/*ngOnInit() {
    this.plantillaService.getPlantillas().subscribe({
      next: (data) => {
        this.plantillas = data;
        this.agruparPorProducto(data);
      },
      error: () => (this.mensaje = '❌ Error al cargar plantillas')
    });
  }*/

  agruparPorProducto(lista: any[]) {
    const grupos: { [key: string]: any[] } = {};
    lista.forEach((p) => {
      if (!grupos[p.producto]) grupos[p.producto] = [];
      grupos[p.producto].push(p);
    });

    this.plantillasAgrupadas = Object.keys(grupos).map((producto) => ({
      producto,
      plantillas: grupos[producto]
    }));
  }

  filtrarPlantillas() {
    const texto = this.filtro.toLowerCase();
    const filtradas = this.plantillas.filter(
      (p) =>
        p.nombre.toLowerCase().includes(texto) ||
        p.producto.toLowerCase().includes(texto)
    );
    this.agruparPorProducto(filtradas);
  }

  seleccionarPlantilla(p: any) {
    this.plantillaSeleccionada = p;
    this.categoria.plantillaId = p._id;
    this.dropdownAbierto = false;
  }

  guardarCategoria() {
    if (!this.categoria.nombre.trim() || !this.categoria.plantillaId) {
      this.mensaje = '⚠️ Por favor completa todos los campos.';
      return;
    }

    this.categoriaService.crearCategoria(this.categoria).subscribe({
      next: () => {
        this.mensaje = '✅ Categoría creada correctamente';
        this.categoria = { nombre: '', descripcion: '', tipo: '', plantillaId: '' };
        this.plantillaSeleccionada = null;
        this.filtro = '';
      },
      error: () => (this.mensaje = '❌ Error al crear la categoría')
    });
  }

  // Cerrar el dropdown si se hace clic fuera
  @HostListener('document:click', ['$event'])
  clickFuera(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.dropdownAbierto = false;
    }
  }
}
