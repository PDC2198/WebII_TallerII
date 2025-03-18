import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model'

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private API_PRODUCTOS = 'http://localhost:8080/productos';

  constructor(private http: HttpClient) {}

  // Obtener todos los productos (Regresa un Observable con un arreglo de Productos)
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.API_PRODUCTOS);
  }

  // Crear un nuevo producto (Recibe un Producto y regresa un Observable de Producto)
  postProductos(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.API_PRODUCTOS}/guardarProducto`, producto);
  }

  // Actualizar un producto existente (Recibe un Producto y su ID, regresa el producto actualizado)
  updateProducto(producto: Producto, id: number): Observable<Producto> {
    return this.http.put<Producto>(`${this.API_PRODUCTOS}/actualizarProducto/${id}`, producto);
  }

  // Obtener un producto por ID (Regresa un Observable de Producto)
  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.API_PRODUCTOS}/${id}`);
  }
  

  // Eliminar un producto (Recibe el ID y regresa una respuesta de eliminación)
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_PRODUCTOS}/eliminarProducto/${id}`);
  }

  // Generar un reporte (Regresa un Observable de tipo Blob, por ejemplo un archivo PDF)
  generarReporte(): Observable<Blob> {
    return this.http.get<Blob>(`${this.API_PRODUCTOS}/reporte/productos`, {
      responseType: 'blob' as 'json',  // Necesitamos especificar 'blob' para obtener un archivo binario
    });
  }
}
