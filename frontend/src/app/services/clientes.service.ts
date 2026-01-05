import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  //private apiUrl = 'http://localhost:3000/api/clientes';
  private apiUrl = 'https://plantillas-ban.onrender.com/api/clientes';

  constructor(private http: HttpClient) {}

  buscar(q: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buscar/${q}`);
  }

  crear(cliente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente);
  }

  exportar() {
    return this.http.get<any[]>(`${this.apiUrl}/exportar`);
  }

  importar(clientes: any[]) {
    return this.http.post(`${this.apiUrl}/importar`, clientes);
  }
}
