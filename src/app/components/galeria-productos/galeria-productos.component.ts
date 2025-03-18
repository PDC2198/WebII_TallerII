import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductosService } from '../../services/productos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-galeria-productos',
  imports:[FormsModule],
  standalone: true,
  templateUrl: './galeria-productos.component.html',
  styleUrls: ['./galeria-productos.component.css']
})
export class GaleriaProductosComponent implements OnInit {
  productos: Producto[] = []; // 👈 Agregar esta propiedad

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => console.error('Error al cargar productos', err)
    });
  }
}
