import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceso-denegado',
  standalone: true,
  imports: [],
  templateUrl: './acceso-denegado.component.html',
  styleUrls: ['./acceso-denegado.component.css']
})
export class AccesoDenegadoComponent {

  constructor(private router: Router) { }

  // Método para navegar a la página de inicio
  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}