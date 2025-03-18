import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.esAdmin()) {
      return true; // Permitir acceso si es admin
    } else {
      this.router.navigate(['/productos']); // Redirigir a productos si no es admin
      return false;
    }
  }
}
