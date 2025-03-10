import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from '../../services/productos.service';
import { CommonModule } from '@angular/common'; // Para usar ngModel en formularios
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],// Importar CommonModule para usar ngModel
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
  providers: [ProductosService], // Proveedor del servicio para este componente standalone
})
export class AgregarProductoComponent {
  // Declaramos las propiedades que se enlazarán con el formulario
  nombre: string = '';
  descripcion: string = '';
  imagenUrl: string = '';
  precio: number = 0;  // Aquí declaramos la propiedad 'precio'

  constructor(
    private productosService: ProductosService,
    private router: Router
  ) { }

  // Método para agregar el producto
  agregarProducto() {
    const nuevoProducto: Producto = {
      id: Date.now(),  // Usamos la fecha actual para crear un ID único
      nombre: this.nombre,
      descripcion: this.descripcion,
      imagenUrl: this.imagenUrl,
      precio: this.precio,  // Aquí usamos el valor de precio
    };

    // Llamamos al servicio para agregar el producto
    this.productosService.addProducto(nuevoProducto);

    // Redirigimos a la página de productos después de agregar el nuevo producto
    this.router.navigate(['/productos']);
  }
}
