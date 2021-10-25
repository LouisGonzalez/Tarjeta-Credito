import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { GLOBAL } from "../global";

import { Tarjeta, CrearTarjeta } from '../../models/tarjeta.model'

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
}
