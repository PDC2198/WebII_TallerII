import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private API_PROVEEDORES = 'http://localhost:8080/proveedores';  // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) { }

  getProveedores(): Observable<any[]> {
    return this.http.get<any[]>(this.API_PROVEEDORES);
  }
}
