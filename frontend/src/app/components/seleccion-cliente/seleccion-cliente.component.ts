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
}
