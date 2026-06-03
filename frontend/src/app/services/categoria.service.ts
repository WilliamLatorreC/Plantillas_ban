import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  //private apiUrl = 'http://localhost:3000/categorias';
   private apiUrl = 'https://plantillas-ban.onrender.com/categorias';

  constructor(private http: HttpClient) {}

  getCategorias() {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(
      this.apiUrl,
      { headers }
    );
  }


  crearCategoria(data: any): Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(
      this.apiUrl,
      data,
      { headers }
    );

  }

  getCategoria(id: string) {
  return this.http.get(
    `${this.apiUrl}/api/proactivanet/categoria/${id}`
  );
}

}
