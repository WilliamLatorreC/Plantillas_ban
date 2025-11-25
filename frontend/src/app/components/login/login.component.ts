import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {

  correo = "";
  contrasena = "";
  error = "";

  constructor(private auth: AuthService, private router: Router) {}

  ingresar() {
    this.auth.login(this.correo, this.contrasena).subscribe({
      next: (res: any) => {
        this.auth.guardarToken(res.token);
        this.router.navigate(["/"]);
      },
      error: () => {
        this.error = "Correo o contraseña incorrectos";
      }
    });
  }
}
