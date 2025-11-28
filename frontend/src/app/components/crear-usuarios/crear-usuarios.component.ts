import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-usuarios.component.html',
  styleUrl: './crear-usuarios.component.css'
})
export class CrearUsuariosComponent {
  correo = '';
  contrasena = '';
  mensaje = '';

  constructor(private usuariosService: UsuariosService) {} // <-- INYECCIÓN CORRECTA

  crearUsuario() {
    this.usuariosService.crearUsuario({
      correo: this.correo,
      contrasena: this.contrasena
    }).subscribe({
      next: (res: any) => {
        this.mensaje = res.message;
        this.correo = "";
        this.contrasena = "";
      },
      error: (err: any) => {  // <-- TIPADO
        this.mensaje = err.error?.message || "Error al crear usuario";
      }
    });
  }

}
