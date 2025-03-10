import { Injectable } from "@angular/core";
import { Producto } from "./productos.service";

@Injectable({
  providedIn: 'root',
})
export class ProductosService {

  private storageKey = 'productos';  // Clave para acceder al LocalStorage
  private carritoKey = 'carrito';  // Clave para acceder al carrito en LocalStorage

  constructor() {
    // Cargar productos predefinidos si no existen en LocalStorage
    if (!this.getProductos().length) {
      this.cargarProductosIniciales();
    }
  }

  // Obtener todos los productos desde LocalStorage
  getProductos(): Producto[] {
    const productos = localStorage.getItem(this.storageKey);
    return productos ? JSON.parse(productos) : [];
  }

  // Obtener los productos del carrito
  getProductosDelCarrito(): Producto[] {
    const carrito = localStorage.getItem(this.carritoKey);
    return carrito ? JSON.parse(carrito) : [];
  }

  // Agregar un producto al carrito
  agregarAlCarrito(producto: Producto): void {
    const carrito = this.getProductosDelCarrito();
    carrito.push(producto);
    localStorage.setItem(this.carritoKey, JSON.stringify(carrito));
  }

  // Eliminar producto del carrito
  eliminarDelCarrito(index: number): void {
    let carrito = this.getProductosDelCarrito();
    carrito.splice(index, 1);
    localStorage.setItem(this.carritoKey, JSON.stringify(carrito));
  }

  // Cargar productos predefinidos
  private cargarProductosIniciales(): void {
    const productosIniciales: Producto[] = [
      {
        "id": 1,
        "nombre": "Producto 1",
        "descripcion": "Descripción del producto 1",
        "precio": 10,
        "imagenUrl": "https://via.placeholder.com/150"
      },
      // Agregar más productos aquí
    ];

    localStorage.setItem(this.storageKey, JSON.stringify(productosIniciales));
  }
}
