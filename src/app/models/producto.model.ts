export interface Producto {
    id?: number; // El ID es opcional porque puede ser generado por la base de datos
    nombre: string;
    descripcion?: string; // Opcional
    precio: number;
    stock: number;
    imagenUrl?: string;
  }
  