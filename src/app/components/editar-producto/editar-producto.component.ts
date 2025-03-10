import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto, ProductosService } from '../../services/productos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
})
export class EditarProductoComponent implements OnInit {
  productoId: number = 0;
  producto: Producto = { id: 0, nombre: '', descripcion: '', imagenUrl: '', precio: 0  };

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener el ID del producto desde la URL
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProducto();
  }

  // Obtener los detalles del producto por ID
  getProducto(): void {
    const producto = this.productosService.getProductoById(this.productoId);
    if (producto) {
      this.producto = { ...producto }; // Copiar los datos del producto
    } else {
      console.error('Producto no encontrado');
      this.router.navigate(['/productos']); // Si no se encuentra el producto, redirigir al listado
    }
  }

  // Método para actualizar el producto
  actualizarProducto(): void {
    this.productosService.updateProducto(this.productoId, this.producto);
    this.router.navigate(['/productos']); // Redirigir a la lista de productos después de actualizar
  }
}
