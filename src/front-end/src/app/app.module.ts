import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { FormatDate } from "../app/formatDate/formatDate";

import { AdminComponent } from './components/Admin/admin/admin.component';
import { CrearCuentaComponent } from './components/Admin/crear-cuenta/crear-cuenta.component';
import { Reporte1Component } from './components/Admin/Reportes/reporte1/reporte1.component';
import { Reporte2Component } from './components/Admin/Reportes/reporte2/reporte2.component';
import { Reporte3Component } from './components/Admin/Reportes/reporte3/reporte3.component';
import { Reporte4Component } from './components/Admin/Reportes/reporte4/reporte4.component';
import { Reporte5Component } from './components/Admin/Reportes/reporte5/reporte5.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CrudMonedaComponent } from './components/Admin/crud-moneda/crud-moneda.component';
import { CrudTipoComponent } from './components/Admin/crud-tipo/crud-tipo.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { LoginComponent } from './components/login/login.component';
import { AumentarComponent } from './components/aumentar/aumentar.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CrearCuentaComponent,
    Reporte1Component,
    Reporte2Component,
    Reporte3Component,
    Reporte4Component,
    Reporte5Component,
    FormatDate,
    CrudMonedaComponent,
    CrudTipoComponent,
    UserHomeComponent,
    LoginComponent,
    AumentarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
