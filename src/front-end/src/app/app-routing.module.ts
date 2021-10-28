import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
//guards
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { LogoutGuard } from './guards/logout.guard';

//Componentes para Admin
import { AdminComponent } from './components/Admin/admin/admin.component'
import { CrearCuentaComponent } from './components/Admin/crear-cuenta/crear-cuenta.component'
import { Reporte1Component } from './components/Admin/Reportes/reporte1/reporte1.component'
import { Reporte2Component } from './components/Admin/Reportes/reporte2/reporte2.component'
import { Reporte3Component } from './components/Admin/Reportes/reporte3/reporte3.component'
import { Reporte4Component } from './components/Admin/Reportes/reporte4/reporte4.component'
import { Reporte5Component } from './components/Admin/Reportes/reporte5/reporte5.component'
import { CrudMonedaComponent } from './components/Admin/crud-moneda/crud-moneda.component'
import { CrudTipoComponent } from './components/Admin/crud-tipo/crud-tipo.component'

//Componentes para usuario
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { AumentarComponent } from './components/aumentar/aumentar.component';



const routes: Routes = [
  //login
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] },
  //rutas para admin
  { path: '', component: AdminComponent, canActivate: [LoginGuard, AdminGuard] },
  { path: 'crear-cuenta', component: CrearCuentaComponent, canActivate: [LoginGuard, AdminGuard] },
  { path: 'reporte1', component: Reporte1Component, canActivate: [LoginGuard, AdminGuard] },
  { path: 'reporte2', component: Reporte2Component, canActivate: [LoginGuard, AdminGuard] },
  { path: 'reporte3', component: Reporte3Component, canActivate: [LoginGuard, AdminGuard] },
  { path: 'reporte4', component: Reporte4Component, canActivate: [LoginGuard, AdminGuard] },
  { path: 'reporte5', component: Reporte5Component, canActivate: [LoginGuard, AdminGuard] },
  { path: 'tipo-cuenta', component: CrudTipoComponent, canActivate: [LoginGuard, AdminGuard] },
  { path: 'moneda', component: CrudMonedaComponent, canActivate: [LoginGuard, AdminGuard] },
  //ruta para usuario
  { path: 'user', component: UserHomeComponent, canActivate: [LoginGuard, UserGuard] },
  { path: 'aumentar', component: AumentarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
