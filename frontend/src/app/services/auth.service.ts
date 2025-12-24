import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private url = "http://localhost:3000/api/auth";
  //private url = 'https://plantillas-ban.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.url}/login`, data);
  } 

  logout() {
    localStorage.removeItem('token'); 
  }
} 
