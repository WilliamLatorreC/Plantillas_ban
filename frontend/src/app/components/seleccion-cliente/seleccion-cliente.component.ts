import { Component, EventEmitter, Output } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seleccion-cliente',
  imports: [FormsModule,      
    HttpClientModule,
    CommonModule, ],
  templateUrl: './seleccion-cliente.component.html',
  styleUrl: './seleccion-cliente.component.css'
})
export class SeleccionClienteComponent {
  busqueda = '';
  resultados: any[] = [];
  clienteSeleccionado: any = null;

  nuevoCliente = {
    nombre: '',
    cc: '',
    telefono: '',
    email: '',
    direccion: ''
  };

  mostrandoCrear = false;

  @Output() seleccionar = new EventEmitter<any>();

  constructor(private clientesService: ClientesService) {}

  buscar() {
    if (this.busqueda.length < 2) return;

    this.clientesService.buscar(this.busqueda).subscribe(r => {
      this.resultados = r;
    });
  }

  elegir(c: any) {
    this.clienteSeleccionado = c;
    this.seleccionar.emit(c);
  }

  crearCliente() {
    this.clientesService.crear(this.nuevoCliente).subscribe(c => {
      this.elegir(c);
      this.mostrandoCrear = false;
    });
  }

  cancelarCrear() {
  this.mostrandoCrear = false;
  this.nuevoCliente = {
    nombre: '',
    cc: '',
    telefono: '',
    email: '',
    direccion: ''
  };
}

/* EXPORTAR */
  exportarClientes() {
    this.clientesService.exportar().subscribe(clientes => {
      const blob = new Blob(
        [JSON.stringify(clientes, null, 2)],
        { type: "application/json" }
      );

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "clientes.json";
      a.click();

      window.URL.revokeObjectURL(url);
    });
  }

  /* IMPORTAR */
  importarClientes(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || !input.files.length) return;

    const file = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const clientes = JSON.parse(reader.result as string);

        this.clientesService.importar(clientes).subscribe(() => {
          alert("Clientes importados correctamente");
          this.buscar(); // refrescar lista
        });

      } catch {
        alert("Archivo JSON inválido");
      }
    };

    reader.readAsText(file);
  }
}
