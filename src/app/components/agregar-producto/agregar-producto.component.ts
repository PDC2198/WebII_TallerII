import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Para obtener el ID de la URL y redirigir
import { ProductosService } from '../../services/productos.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agregar-producto.component.html',
})
export class AgregarProductoComponent {

  producto: any = {
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagenUrl: '',
    proveedor: null
  };
  productos: any[] = [];
  proveedores: any[] = [];
  id: number | null = null;  // Agregamos un campo para almacenar el ID del producto

  constructor(
    private servicio: ProductosService,
    private servicioProveedor: ProveedoresService,
    private router: Router,
    private route: ActivatedRoute  // Para obtener el ID de la URL
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.servicio.getProductoById(this.id).subscribe(producto => {
        this.producto = producto;
      });
    }

    // Cargar proveedores
    this.servicioProveedor.getProveedores().subscribe(supplier => {
      this.proveedores = supplier;
    });

    // Cargar productos y mostrarlos en la lista
    this.servicio.getProductos().subscribe({
      next: (data) => {
        this.productos = data; // Guardar los productos en la variable productos
        console.log("Productos cargados:", this.productos); // Verificar en la consola
      },
      error: (err) => {
        console.error("Error al cargar productos:", err);
      }
    });
  }

  guardar(formulario: any) {
    // Validar que los campos requeridos no estén vacíos
    if (!this.producto.nombre || !this.producto.precio || !this.producto.stock || !this.producto.proveedor) {
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }

    // Si estamos editando un producto, actualizamos
    if (this.id) {
      this.servicio.updateProducto(this.producto, this.id).subscribe({
        next: () => {
          this.router.navigate(['/productos']);
          alert('Producto actualizado exitosamente'); // Feedback de éxito
        },
        error: (err) => {
          alert('Error al actualizar el producto');
          console.error(err); // Log de error para depuración
        }
      });
    } else {
      // Si no hay ID, creamos un nuevo producto
      this.servicio.postProductos(this.producto).subscribe({
        next: () => {
          this.router.navigate(['/productos']);
          alert('Producto agregado exitosamente'); // Feedback de éxito
        },
        error: (err) => {
          alert('Error al agregar el producto');
          console.error(err); // Log de error para depuración
        }
      });
    }
  }

}
