import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,      
    HttpClientModule,
    CommonModule
  ]
})
export class LoginComponent {

  correo = '';
  contrasena = '';
  error: string = '';
  
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const data = {
      correo: this.correo,
      contrasena: this.contrasena
    };

    this.authService.login(data).subscribe({
      next: (resp: any) => {
        localStorage.setItem('token', resp.token);  
        this.router.navigate(['/plantillas']);        
      },
      error: (err) => {
        console.error(err);
        this.error = err.error?.message || "Error inesperado";
      }
    });
  }
}