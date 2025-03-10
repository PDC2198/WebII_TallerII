import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleMatcherGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);

  // Verificar si el usuario tiene el rol adecuado para acceder a la ruta
  if (authService.estaAutenticado() && authService.tieneRol('admin')) {
    return true;
  } else {
    return false;
  }
};
