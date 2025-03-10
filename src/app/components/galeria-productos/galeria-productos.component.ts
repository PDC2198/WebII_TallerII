import { Component, OnInit } from '@angular/core';
import { Producto, ProductosService } from '../../services/productos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-galeria-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria-productos.component.html',
  styleUrls: ['./galeria-productos.component.css'],
  providers: [ProductosService],
})
export class GaleriaProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productos = this.productosService.getProductos();
  }
}
