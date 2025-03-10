import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router, private authService: AuthService) { }

  explorarProductos(): void {
    if (this.authService.estaAutenticado()) {
      // Si el usuario está autenticado, redirige a productos
      this.router.navigate(['/galeria-productos']);
    } else {
      // Si no está autenticado, redirige al login
      this.router.navigate(['/login']);
    }
  }
}