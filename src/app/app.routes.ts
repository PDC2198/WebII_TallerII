import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { SuscripcionComponent } from './components/suscripcion/suscripcion.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { FacturaComponent } from './components/factura/factura.component';
import { AccesoDenegadoComponent } from './components/acceso-denegado/acceso-denegado.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'suscripcion', component: SuscripcionComponent },
    { path: 'agregar-producto', component: AgregarProductoComponent, canActivate: [AuthGuard] },
    { path: 'editar-producto/:id', component: EditarProductoComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'factura',
        component: FacturaComponent,

    },
    { path: 'acceso-denegado', component: AccesoDenegadoComponent },
    { path: '**', redirectTo: '/productos' }
];