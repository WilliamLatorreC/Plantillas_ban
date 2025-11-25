import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "https://plantillas-ban-1.onrender.com/api/auth";

  constructor(private http: HttpClient, private router: Router) {}

  login(correo: string, contrasena: string) {
    return this.http.post(`${this.apiUrl}/login`, { correo, contrasena });
  }

  guardarToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem("token");
  }
}
