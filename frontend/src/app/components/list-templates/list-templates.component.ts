import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantillaService } from '../../services/plantilla.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-templates',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './list-templates.component.html',
  styleUrls: ['./list-templates.component.css']
})
export class ListTemplatesComponent {

  busqueda = '';
  plantillas: any[] = [];
  plantillaSeleccionada: any = null;

  modoPersonalizado = false;
  textoPersonalizado = '';

  @Output() plantilla = new EventEmitter<any>();
  @Output() personalizado = new EventEmitter<string>();

  constructor(private plantillasService: PlantillaService) {}

  buscar() {
    if (this.busqueda.length < 2) {
      this.plantillas = [];
      return;
    }

    this.plantillasService.buscar(this.busqueda).subscribe({
      next: (res: any[]) => {
        this.plantillas = res;
      },
      error: () => {
        this.plantillas = [];
      }
    });
  }

  seleccionar(p: any) {
    this.plantillaSeleccionada = p;
    this.modoPersonalizado = false;
    this.plantilla.emit(p);
  }

  activarPersonalizado() {
    this.plantillaSeleccionada = null;
    this.modoPersonalizado = true;
    this.personalizado.emit(this.textoPersonalizado);
  }

  cerrarPersonalizado() {
    this.modoPersonalizado = false;
    this.textoPersonalizado = '';
    this.personalizado.emit(this.textoPersonalizado);
  }
}
