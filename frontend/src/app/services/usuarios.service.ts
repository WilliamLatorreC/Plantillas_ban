import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'https://plantillas-ban.onrender.com/api/auth';

  constructor(private http: HttpClient) {}   // <-- ESTO FALTABA

  crearUsuario(data: any) {
    return this.http.post(`${this.apiUrl}/crear-usuario`, data, {
      headers: {
        Authorization: localStorage.getItem("token") || ""
      }
    });
  }
}
