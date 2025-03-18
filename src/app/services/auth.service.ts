import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Usuario {
  nombre: string;
  rol: string;  // Puede ser 'admin', 'usuario', etc.
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);

  constructor() {
    // Solo accede a localStorage si estamos en el cliente
    if (typeof window !== 'undefined') {
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
        this.usuarioSubject.next(JSON.parse(usuarioGuardado));
      }
    }
  }

  // Método para iniciar sesión
  login(usuario: Usuario): boolean {
    if (typeof window !== 'undefined') {
      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.usuarioSubject.next(usuario);
      return true;  // Login exitoso
    }
    return false;  // Si no está en un entorno de cliente
  }

  // Método para cerrar sesión
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('usuario');
      this.usuarioSubject.next(null);
    }
  }

  // Obtener el usuario actual como un observable
  get usuario$() {
    return this.usuarioSubject.asObservable();
  }

  // Obtener el usuario actual de forma síncrona
  getUsuario(): Usuario | null {
    return this.usuarioSubject.value;
  }

  // Verificar si el usuario tiene un rol específico
  tieneRol(rol: string): boolean {
    return this.getUsuario()?.rol === rol;
  }

  // Nuevo método para verificar si el usuario es administrador
  esAdmin(): boolean {
    return this.tieneRol('admin');
  }

  // Verificar si el usuario está autenticado
  estaAutenticado(): boolean {
    return !!this.getUsuario();
  }
}
