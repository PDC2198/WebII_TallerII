import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';
import { Router, RouterModule } from '@angular/router';  // Asegúrate de importar Router
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductosService],
})
export class ProductosComponent implements OnInit {
  esAdmin: boolean = false;
  productos: Producto[] = [];
  carrito: Producto[] = [];
  modalAbierto = false;

  // Inyecta el servicio Router en el constructor
  constructor(private productosService: ProductosService, private router: Router, private authService: AuthService) { }

  producto: Producto = { id: 0, nombre: '', descripcion: '', imagenUrl: '', precio: 0, stock: 0 };

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(productos => {
      this.productos = productos;
      this.authService.usuario$.subscribe(usuario => {
        this.esAdmin = this.authService.esAdmin();
      });
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
      this.productosService.eliminarProducto(id).subscribe(() => {
        this.productos = this.productos.filter(p => p.id !== id);
        alert('Producto eliminado con éxito');
      }, error => {
        console.error('Error al eliminar el producto:', error);
        alert('No se pudo eliminar el producto');
      });
    }
  }}
