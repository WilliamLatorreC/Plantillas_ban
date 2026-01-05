import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

export interface Plantilla {
  _id?: string;
  nombre: string;
  producto: string;
  contenido: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlantillaService {
  //private apiUrl = 'http://localhost:3000/api/plantillas';
  private apiUrl = 'https://plantillas-ban.onrender.com/api/plantillas';
  constructor(private http: HttpClient) {}

  buscar(q: string) {
    return this.http.get<any[]>(`${this.apiUrl}/buscar?q=${q}`);
  }

  crear(plantilla: any) {
    return this.http.post(this.apiUrl, plantilla);
  }

  obtener(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getPlantillas() {
    return this.http.get<any[]>("http://localhost:3000/api/plantillas", {
      headers: {
        Authorization: localStorage.getItem("token") || ""
      }
    });
  }

  crearPlantilla(data: any) {
    return this.http.post("http://localhost:3000/api/plantillas", data, {
      headers: {
        Authorization: localStorage.getItem("token") || ""
      }
    });
  }

  updatePlantilla(id: string, data: any) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      data
    );
  }

}
