import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeleccionClienteComponent } from '../seleccion-cliente/seleccion-cliente.component';
import { ListTemplatesComponent } from '../list-templates/list-templates.component';
import { PlantillaService } from '../../services/plantilla.service';
import { FormsModule } from '@angular/forms';
import { VistaPreviewComponent } from '../vista-preview/vista-preview.component';


@Component({
  selector: 'app-flujo',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    SeleccionClienteComponent,
    ListTemplatesComponent,
  ],
  templateUrl: './flujo.component.html',
  styleUrls: ['./flujo.component.css']
})
export class FlujoComponent {
  cliente: any = null;
  plantilla: any = null;
  contenidoFinal: string = '';
  
  guardando = false;
  mensajeGuardado = '';

  constructor(private PlantillaService: PlantillaService) {}

  onClienteSeleccionado(c: any) {
    this.cliente = c;
    this.procesarContenido();
  }

  onPlantillaSeleccionada(p: any) {
    this.plantilla = p;
    this.procesarContenido();
  }

  procesarContenido() {
    console.log('🧑 Cliente:', this.cliente);
    console.log('📄 Plantilla:', this.plantilla);

    if (!this.cliente || !this.plantilla) {
      this.contenidoFinal = '';
      return;
    }

    console.log('📄 CONTENIDO ORIGINAL:', this.plantilla.contenido);

    let texto = this.plantilla.contenido;

    texto = texto.replace(/{{\s*nombre\s*}}/gi, this.cliente.nombre || '');
    texto = texto.replace(/{{\s*cc\s*}}/gi, this.cliente.cc || '');
    texto = texto.replace(/{{\s*telefono\s*}}/gi, this.cliente.telefono || '');
    texto = texto.replace(/{{\s*email\s*}}/gi, this.cliente.email || '');
    texto = texto.replace(/{{\s*direccion\s*}}/gi, this.cliente.direccion || '');

    console.log('✅ TEXTO FINAL:', texto);

    this.contenidoFinal = texto;
  }

  copiarContenido() {
    if (!this.contenidoFinal) return;

    navigator.clipboard.writeText(this.contenidoFinal).then(() => {
      alert('Contenido copiado al portapapeles 📋');
    });
  }

guardarCambios() {
  if (!this.plantilla) return;

  this.guardando = true;
  this.mensajeGuardado = '';

  this.PlantillaService.updatePlantilla(this.plantilla._id, {
    contenido: this.contenidoFinal,
    resolucion: this.plantilla.resolucion
  })
  .subscribe({
    next: (res: any) => {
      this.guardando = false;
      this.mensajeGuardado = '✅ Cambios guardados correctamente';
    },
    error: () => {
      this.guardando = false;
      this.mensajeGuardado = '❌ Error al guardar cambios';
    }
  });
}


}
