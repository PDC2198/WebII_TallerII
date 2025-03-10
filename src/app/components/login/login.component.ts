import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Usuario } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  usuario: Usuario = { nombre: '', rol: '' };
  error: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.authService.login(this.usuario)) {
      // Si el login es exitoso, redirigir según el rol
      if (this.usuario.rol === 'admin') {
        this.router.navigate(['/galeria-productos']);
      } else {
        this.router.navigate(['/usuario']);
      }
    } else {
      this.error = true;
    }
  }
}
