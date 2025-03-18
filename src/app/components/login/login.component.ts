import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Usuario } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  usuario: Usuario = { nombre: '', rol: '' };
  contrasena: string = '';
  error: boolean = false;
  requiereContrasena: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  // Método para detectar cambios en el rol
  onRolChange(): void {
    this.requiereContrasena = this.usuario.rol === 'admin';
  }

  login(): void {
    // Si es administrador, verifica la contraseña única
    if (this.requiereContrasena && this.contrasena !== 'padcs') {
      this.error = true;
      return;
    }

    if (this.authService.login(this.usuario)) {
      if (this.usuario.rol === 'admin') {
        this.router.navigate(['/productos']);
      } else {
        this.router.navigate(['/usuario']);
      }
    } else {
      this.error = true;
    }
  }
}
