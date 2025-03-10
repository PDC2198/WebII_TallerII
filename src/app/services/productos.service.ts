import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private storageKey = 'productos'; // Clave para acceder al LocalStorage
  private productosSubject = new BehaviorSubject<Producto[]>(this.getProductos());
  productos$ = this.productosSubject.asObservable();

  constructor() {
    if (!this.getProductos().length) {
      this.cargarProductosIniciales();
    }
  }

  // Obtener productos desde LocalStorage
  getProductos(): Producto[] {
    const productos = localStorage.getItem(this.storageKey);
    return productos ? JSON.parse(productos) : [];
  }

  // Obtener un producto por su ID
  getProductoById(id: number): Producto | undefined {
    return this.getProductos().find(producto => producto.id === id);
  }

  // Agregar un nuevo producto
  addProducto(producto: Producto): void {
    const productos = [...this.getProductos(), producto];
    this.actualizarProductos(productos);
  }

  // Actualizar un producto
  updateProducto(id: number, productoActualizado: Producto): void {
    const productos = this.getProductos().map(p => p.id === id ? productoActualizado : p);
    this.actualizarProductos(productos);
  }

  // Eliminar un producto
  deleteProducto(id: number): void {
    const productos = this.getProductos().filter(p => p.id !== id);
    this.actualizarProductos(productos);
  }

  // Método privado para actualizar LocalStorage y emitir cambios
  private actualizarProductos(productos: Producto[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(productos));
    this.productosSubject.next(productos); // Emitir actualización a los suscriptores
  }

  // Cargar productos iniciales
  private cargarProductosIniciales(): void {
    const productosIniciales: Producto[] = [
      { id: 1, nombre: "Producto 1", descripcion: "Descripción del producto 1", precio: 10, imagenUrl: "https://via.placeholder.com/150" },
      { id: 2, nombre: "Producto 2", descripcion: "Descripción del producto 2", precio: 20, imagenUrl: "https://via.placeholder.com/150" },
      { id: 3, nombre: "Producto 3", descripcion: "Descripción del producto 3", precio: 30, imagenUrl: "https://via.placeholder.com/150" },
      { id: 4, nombre: "Producto 4", descripcion: "Descripción del producto 4", precio: 40, imagenUrl: "https://via.placeholder.com/150" },
      { id: 5, nombre: "Producto 5", descripcion: "Descripción del producto 5", precio: 50, imagenUrl: "https://via.placeholder.com/150" }
    ];
    this.actualizarProductos(productosIniciales);
  }
}
