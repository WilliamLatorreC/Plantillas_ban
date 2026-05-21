import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProactivanetService {

  //private apiUrl = 'http://localhost:3000/api/proactivanet';
  private apiUrl = 'https://plantillas-ban.onrender.com/api/proactivanet';
  constructor(private http: HttpClient) {}

  crearTicket(data: any) {
    return this.http.post(`${this.apiUrl}/crear-ticket`, data);
  }

  obtenerCategorias() {
    return this.http.get<any[]>(
      `${this.apiUrl}/categorias`
    );
  }

  buscarCategorias(texto: string) {

    return this.http.get<any[]>(
      `${this.apiUrl}/categorias/buscar?q=${texto}`
    );

  }
}
