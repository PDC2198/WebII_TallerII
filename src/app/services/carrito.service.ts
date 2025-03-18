import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito = new BehaviorSubject<Producto[]>([]);
  carrito$ = this.carrito.asObservable();

  agregarAlCarrito(producto: Producto) {
    const carritoActual = this.carrito.getValue();
    this.carrito.next([...carritoActual, producto]);
  }

  obtenerCarrito(): Producto[] {
    return this.carrito.getValue();
  }

  vaciarCarrito() {
    this.carrito.next([]);
  }
}
