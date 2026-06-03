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

  obtenerCategoriasServicio(
    portfolioId: string
    ) {
      return this.http.get(
        `${this.apiUrl}/portfolio/${portfolioId}/categorias`
      );
  }

  getServicios() {
    return this.http.get(
      'http://localhost:3000/api/proactivanet/portfolio'
    );
  }

  getCategoriasServicio(id: string) {

    return this.http.get(
      `http://localhost:3000/api/proactivanet/portfolio/${id}/relatedCategories`
    );

  }

  getHijosCategoria(id:string) {
    return this.http.get(
      `${this.apiUrl}/categoria/${id}/hijos`,
      {}
    );
  }
}
