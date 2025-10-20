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
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ===== OBTENER TODAS LAS PLANTILLAS =====
  getPlantillas(): Observable<Plantilla[]> {
    return this.http.get<Plantilla[]>(`${this.apiUrl}/plantillas`);
  }

  // ===== CREAR PLANTILLA =====
  crearPlantilla(plantilla: Plantilla): Observable<Plantilla> {
    return this.http.post<Plantilla>(`${this.apiUrl}/plantillas`, plantilla);
  }

  // ===== ACTUALIZAR PLANTILLA =====
  actualizarPlantilla(plantilla: Plantilla): Observable<Plantilla> {
    if (!plantilla._id) throw new Error('ID de plantilla requerido');
    return this.http.put<Plantilla>(`${this.apiUrl}/plantillas/${plantilla._id}`, plantilla);
  }

  // ===== ELIMINAR PLANTILLA =====
  eliminarPlantilla(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/plantillas/${id}`);
  }
}
