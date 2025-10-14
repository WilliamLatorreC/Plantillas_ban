import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Plantilla {
  _id?: string;
  nombre: string;
  producto: string;
  contenido: string;
  fechaCreacion?: string;
}
@Injectable({
  providedIn: 'root'
})
export class PlantillaService {

  private apiUrl = 'https://plantillas-ban.onrender.com/plantillas';

  constructor(private http: HttpClient) {}

  // 🔹 Obtener todas las plantillas
  getPlantillas(): Observable<Plantilla[]> {
    return this.http.get<Plantilla[]>(this.apiUrl);
  }

  // 🔹 Guardar una nueva plantilla
  savePlantilla(plantilla: Plantilla): Observable<Plantilla> {
    return this.http.post<Plantilla>(this.apiUrl, plantilla);
  }

  // 🔹 Eliminar una plantilla (opcional)
  deletePlantilla(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
