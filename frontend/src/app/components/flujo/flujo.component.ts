import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SeleccionClienteComponent } from '../seleccion-cliente/seleccion-cliente.component';
import { ListTemplatesComponent } from '../list-templates/list-templates.component';

import { PlantillaService } from '../../services/plantilla.service';
import { ProactivanetService } from '../../services/proactivanet.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-flujo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SeleccionClienteComponent,
    ListTemplatesComponent
  ],
  templateUrl: './flujo.component.html',
  styleUrls: ['./flujo.component.css']
})
export class FlujoComponent implements OnInit {

  // =========================
  // VARIABLES
  // =========================

  cliente: any = null;

  plantilla: any = null;

  plantillaEditable: any = null;

  contenidoFinal: string = '';

  guardando = false;

  mensajeGuardado = '';

  categorias: any[] = [];

  servicios: any[] = [];

  cargandoCategorias = false;

  servicioSeleccionado = '';

  tipoSeleccionado = '';

  serviciosFiltrados: any[] = [];

  categoriasFiltradas: any[] = [];

  categoriaSeleccionada: any = null;

  categoriasServicio: any[] = [];

  categoriaSeleccionadaId = '';

  // =========================
  // CONSTRUCTOR
  // =========================

  constructor(
    private plantillaService: PlantillaService,
    private proactivanetService: ProactivanetService,
    private categoriaService: CategoriaService,
  ) {}

  // =========================
  // INIT
  // =========================

  ngOnInit() {
    this.cargarServicios();
  }

  // =========================
  // CLIENTE
  // =========================

  onClienteSeleccionado(cliente: any) {

    this.cliente = cliente;

    this.procesarContenido();

  }

  // =========================
  // PLANTILLA
  // =========================

  onPlantillaSeleccionada(plantilla: any) {

    this.plantilla = plantilla;

    // COPIA EDITABLE
    this.plantillaEditable = {
      ...plantilla
    };

    this.procesarContenido();

  }

  onCambioPlantilla() {

    this.plantilla = this.plantillaEditable;

    this.procesarContenido();

  }

  // =========================
  // PROCESAR CONTENIDO
  // =========================

  procesarContenido() {

    if (!this.cliente || !this.plantillaEditable) {

      this.contenidoFinal = '';

      return;

    }

    let texto = this.plantillaEditable.contenido || '';

    // CLIENTE
    texto = texto.replace(/{{\s*nombre\s*}}/gi, this.cliente.nombre || '');

    texto = texto.replace(/{{\s*cc\s*}}/gi, this.cliente.cc || '');

    texto = texto.replace(/{{\s*telefono\s*}}/gi, this.cliente.telefono || '');

    texto = texto.replace(/{{\s*email\s*}}/gi, this.cliente.email || '');

    texto = texto.replace(/{{\s*direccion\s*}}/gi, this.cliente.direccion || '');

    // PLANTILLA
    texto = texto.replace(/{{\s*producto\s*}}/gi, this.plantillaEditable.producto || '');

    texto = texto.replace(/{{\s*categoria\s*}}/gi, this.plantillaEditable.categoriaNombre || '');

    this.contenidoFinal = texto;

  }

  // =========================
  // COPIAR
  // =========================

  copiarContenido() {

    if (!this.contenidoFinal) return;

    navigator.clipboard.writeText(this.contenidoFinal);

    alert('📋 Contenido copiado');

  }

  // =========================
  // GUARDAR CAMBIOS
  // =========================

  guardarCambios() {

    if (!this.plantillaEditable?._id) return;

    this.guardando = true;

    this.mensajeGuardado = '';

    const body = {

      nombre: this.plantillaEditable.nombre,

      producto: this.plantillaEditable.producto,

      contenido: this.plantillaEditable.contenido,

      resolucion: this.plantillaEditable.resolucion,

    };

    this.plantillaService
      .updatePlantilla(this.plantillaEditable._id, body)
      .subscribe({

        next: () => {

          this.guardando = false;

          this.mensajeGuardado =
            '✅ Plantilla actualizada correctamente';

        },

        error: (err) => {

          console.error(err);

          this.guardando = false;

          this.mensajeGuardado =
            '❌ Error actualizando plantilla';

        }

      });

  }

  // =========================
  // CATEGORIAS PROACTIVANET
  // =========================

  cargarCategorias() {

    this.cargandoCategorias = true;

    this.categoriaService
      .getCategorias()
      .subscribe({

        next: (data: any) => {

          console.log('✅ Categorías Mongo:', data);

          this.categorias = data;

          this.cargandoCategorias = false;

        },

        error: (err) => {

          console.error(err);

          this.cargandoCategorias = false;

        }

      });

  }

  cargarServicios() {

  this.proactivanetService
    .getServicios()
    .subscribe({

      next: (data:any) => {

        console.log('SERVICIOS');
        console.log(data);

        this.servicios = data;
        this.serviciosFiltrados = data;

      }

    });

}

  // =========================
  // CAMBIO DE CATEGORIA
  // =========================

  onCategoriaChange(event: any) {

    const categoriaMongoId =
      event.target.value;

    const categoria =
      this.categorias.find(
        (c: any) => c._id === categoriaMongoId
      );

    if (!categoria) return;

      // NOMBRE
      this.plantillaEditable.categoriaNombre =
        categoria.nombre;

      // CATEGORY ID PROACTIVANET
      this.plantillaEditable.categoriaId =
        categoria.categoryId;

      // TYPE ID PROACTIVANET
      this.plantillaEditable.tipoId =
        categoria.typeId;

      // PORTFOLIO
      this.plantillaEditable.portfolio =
        categoria.portfolio;

      console.log(
        '✅ Categoría seleccionada:',
        categoria
    );

  }

  filtrarServicios() {

    console.log(this.servicios[0]);
    console.log(this.servicios);
    console.log(this.serviciosFiltrados);

    this.serviciosFiltrados = this.servicios;

  }

  filtrarCategorias() {

  this.categoriasFiltradas =
    this.categorias.filter(
      x => x.typeId === this.tipoSeleccionado
    );

}

  onServicioChange() {

    this.proactivanetService
      .getCategoriasServicio(this.servicioSeleccionado)
      .subscribe({

        next: (data: any) => {

          console.log('Categorias del servicio');
          console.log(data);

          this.categoriasServicio = data;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  onCategoriaSeleccionada() {

    const categoria =
      this.categoriasServicio.find(
        x => x.PadCategories_id === this.categoriaSeleccionadaId
      );

    if (!categoria) return;

    this.categoriaSeleccionada = categoria;

    console.log(categoria);

  }

  // =========================
  // CREAR TICKET
  // =========================

  crearTicket() {

    if (!this.cliente || !this.plantillaEditable) {

      alert('⚠ Debes seleccionar cliente y plantilla');

      return;

    }

    const body = {

      Title: this.plantillaEditable.nombre,

      Description: this.contenidoFinal,

      FederatedCode: '',

      PanUsers_idSource:
        'ef000a02-b987-4197-bf3c-1d2f994c0af6',

      PadSources_id:
        '2a8d3b77-74f6-447d-af3e-f323802ecb94',

      PadTypes_id:
        this.tipoSeleccionado,

      PadPortfolio_id:
        this.servicioSeleccionado,

      PadCategories_id:
        this.categoriaSeleccionadaId,

      SendUserNotification: true

    };

    console.log('🎫 BODY TICKET:', body);

    this.proactivanetService
      .crearTicket(body)
      .subscribe({

        next: (resp) => {

          console.log(resp);

          alert('✅ Ticket creado correctamente');

        },

        error: (err) => {

          console.error(err);

          alert('❌ Error creando ticket');

        }

      });

  }

  buscarCategorias(event: any) {

    const texto = event.target.value;

    if (!texto || texto.length < 2) {
      this.categorias = [];
      return;
    }

    this.proactivanetService
      .buscarCategorias(texto)
      .subscribe({

        next: (data: any) => {

          this.categorias = data;

          console.log('Categorías encontradas:', data);

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

}