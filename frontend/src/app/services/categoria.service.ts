import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  //private apiUrl = 'http://localhost:3000/categorias';
  private apiUrl = 'https://plantillas-ban.onrender.com/categorias';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearCategoria(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
