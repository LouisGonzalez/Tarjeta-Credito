import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes para Admin
import { AdminComponent } from './components/Admin/admin/admin.component'
import { CrearCuentaComponent } from './components/Admin/crear-cuenta/crear-cuenta.component'


const routes: Routes = [
  //rutas para admin
  { path: '', component: AdminComponent },
  { path: 'crear-cuenta', component: CrearCuentaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
