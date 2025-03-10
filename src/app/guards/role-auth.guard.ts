import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  // Verificar si el usuario está autenticado y tiene el rol adecuado
  if (authService.estaAutenticado() && authService.tieneRol('admin')) {
    return true;
  } else {
    // Si no está autenticado o no tiene el rol adecuado, redirigir a la página de acceso denegado
    return false;
  }
};
