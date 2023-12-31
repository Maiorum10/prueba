import { ProductosComponent } from './productos/productos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'categorias',
    pathMatch: 'full',
  },
  {
    path: 'categorias',
    component: CategoriasComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
