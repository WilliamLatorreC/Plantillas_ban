import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'https://plantillas-ban.onrender.com/plantillas';

  generarPlantilla(data: { nombre: string; producto: string }) {
    return this.http.post(`${environment.apiUrl}/generate-template`, data);
  }
  
}