import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-producto',
  imports:[FormsModule, CommonModule],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  producto: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    imagenUrl: '',
    precio: 0,
    stock: 0
  };

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del producto desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID del producto:', id); 
    if (id) {
      this.obtenerProducto(id);
    }
  }

  obtenerProducto(id: number): void {
    this.productosService.getProductoById(id).subscribe({
      next: (producto) => {
        console.log('Producto recuperado:', producto); // <-- Depuración
        this.producto = producto;
      },
      error: (error) => {
        console.error('Error al cargar el producto:', error);
      }
    });
  }

  actualizarProducto(): void {
    if (this.producto.id) {
      this.productosService.updateProducto(this.producto, this.producto.id).subscribe({
        next: () => {
          alert('Producto actualizado correctamente');
          this.router.navigate(['/productos']);
        },
        error: (error) => {
          console.error('Error al actualizar el producto:', error);
        }
      });
    }
  }
}
