import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes para Admin
import { AdminComponent } from './components/Admin/admin/admin.component'
import { CrearCuentaComponent } from './components/Admin/crear-cuenta/crear-cuenta.component'
import { Reporte1Component } from './components/Admin/Reportes/reporte1/reporte1.component'
import { Reporte2Component } from './components/Admin/Reportes/reporte2/reporte2.component'
import { Reporte3Component } from './components/Admin/Reportes/reporte3/reporte3.component'
import { Reporte4Component } from './components/Admin/Reportes/reporte4/reporte4.component'
import { Reporte5Component } from './components/Admin/Reportes/reporte5/reporte5.component'



const routes: Routes = [
  //rutas para admin
  { path: '', component: AdminComponent },
  { path: 'crear-cuenta', component: CrearCuentaComponent },
  { path: 'reporte1', component: Reporte1Component },
  { path: 'reporte2', component: Reporte2Component },
  { path: 'reporte3', component: Reporte3Component },
  { path: 'reporte4', component: Reporte4Component },
  { path: 'reporte5', component: Reporte5Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
