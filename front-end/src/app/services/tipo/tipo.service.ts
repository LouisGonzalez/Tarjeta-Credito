import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { GLOBAL } from "../global";

import { TipoCuenta } from "../../models/tipo_cuenta.model"

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  public url: string

  constructor(
    public _http: HttpClient,
  ) {
    this.url = GLOBAL.url
  }

  listarTipos(): Observable<any> {
    let a = this._http.get(this.url + `tipo_cuenta`)
    return a;
  }
}
