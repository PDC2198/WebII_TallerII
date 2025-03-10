import { Component, OnInit } from '@angular/core';
import { Producto, ProductosService } from '../../services/productos.service';
import { Router, RouterModule } from '@angular/router';  // Asegúrate de importar Router
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductosService],
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  carrito: Producto[] = [];
  modalAbierto = false;

  // Inyecta el servicio Router en el constructor
  constructor(private productosService: ProductosService, private router: Router) { }

  ngOnInit(): void {
    // Suscribirse a productos$
    this.productosService.productos$.subscribe(productos => {
      this.productos = productos;
    });
  }

  // Agregar producto al carrito
  agregarAlCarrito(producto: Producto): void {
    this.carrito.push(producto);
    alert(`"${producto.nombre}" ha sido agregado al carrito.`);
  }

  // Abrir/Cerrar modal
  toggleModal(): void {
    this.modalAbierto = !this.modalAbierto;
  }

  // Eliminar del carrito
  eliminarDelCarrito(index: number): void {
    this.carrito.splice(index, 1);
  }

  // Generar la factura
  generarFactura(): void {
    this.router.navigate(['/factura'], { state: { carrito: this.carrito } });
    this.toggleModal();  // Cerrar el modal antes de redirigir
  }

  confirmarEliminacion(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productosService.deleteProducto(id);
    }
  }
}
