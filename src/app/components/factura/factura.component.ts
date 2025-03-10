import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
})
export class FacturaComponent implements OnInit {
  carrito: any[] = [];
  total: number = 0;
  iva: number = 0;
  totalConIVA: number = 0;

  // Inyectar Router en el constructor
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Obtener los productos del carrito desde el estado de la navegación
    const state = history.state;
    if (state && state.carrito) {
      this.carrito = state.carrito;
      this.calcularFactura();
    }
  }

  // Calcular total, IVA y total con IVA
  calcularFactura(): void {
    this.total = this.carrito.reduce((acc, producto) => acc + producto.precio, 0);
    this.iva = this.total * 0.15;  // Ajustado a un IVA del 15%
    this.totalConIVA = this.total + this.iva;
  }

  confirmarCompra() {
    this.router.navigate(['/productos']); // Redirigir a la página de productos
  }
}
