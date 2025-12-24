import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private api = 'https://plantillas-ban.onrender.com/api/auth';
  ////private api = "http://localhost:3000/api/auth";
  constructor(private http: HttpClient) {}   

   buscar(q: string) {
    return this.http.get<any[]>(`${this.api}?q=${q}`);
  }

  crear(cliente: any) {
    return this.http.post(this.api, cliente);
  }

  obtener(id: string) {
    return this.http.get(`${this.api}/${id}`);
  }

  getPlantillas() {
    return this.http.get<any[]>("http://localhost:3000/api/plantillas", {
      headers: {
        Authorization: localStorage.getItem("token") || ""
      }
    });
  }

  crearUsuario(data: any): Observable<any> {
    return this.http.post(`${this.api}/crear-usuario`, data, {
      headers: {
        Authorization: localStorage.getItem('token') || ''
      }
    });
  }
}
