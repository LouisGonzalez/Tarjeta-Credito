import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { GLOBAL } from "../global";

import { Tarjeta, CrearTarjeta } from '../../models/tarjeta.model'
import { Deshabilitacion } from 'src/app/models/deshabilitacion.model';
import { Eliminacion } from 'src/app/models/eliminacion.model';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  public url: string

  constructor(
    public _http: HttpClient,
  ) {
    this.url = GLOBAL.url
  }

  listarTarjetas(): Observable<any> {
    let a = this._http.get(this.url + `tarjeta`);
    return a;
  }
  generarDatos(): Observable<any> {
    let a = this._http.get(this.url + "tarjeta/generar-datos")
    return a;
  }

  crearTarjeta(_tarjeta: CrearTarjeta): Observable<any> {
    let a = this._http.post(this.url + "tarjeta", _tarjeta)
    return a;
  }
  //reportes
  movimientos(fecha: string): Observable<any> {
    let a = this._http.get(this.url + "tarjeta/ultimos-movimientos/" + fecha)
    return a;
  }
  bloqueadas(): Observable<any> {
    let a = this._http.get(this.url + "tarjeta/bloqueadas")
    return a;
  }
  total(): Observable<any> {
    let a = this._http.get(this.url + "tarjeta/total")
    return a;
  }
  cierre(): Observable<any> {
    let a = this._http.get(this.url + "tarjeta/cierre")
    return a;
  }

  buscar(numero: string): Observable<any> {
    let a = this._http.get(this.url + "tarjeta/" + numero)
    return a;
  }
  deshabilitar(deshabilitacion: Deshabilitacion): Observable<any> {
    let a = this._http.post(this.url + "deshabilitacion", deshabilitacion)
    return a;
  }
  habilitar(tarjeta_id: number): Observable<any> {
    let a = this._http.delete(this.url + "deshabilitacion/" + tarjeta_id)
    return a;
  }

  eliminar(eliminacion: Eliminacion): Observable<any> {
    let a = this._http.post(this.url + "eliminacion", eliminacion)
    return a;
  }

  buscarTarjetas(usuario_id: number): Observable<any> {
    let a = this._http.get(this.url + "tarjeta/buscar-tarjetas/" + usuario_id)
    return a;
  }
}
