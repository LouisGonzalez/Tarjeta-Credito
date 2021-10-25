import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { GLOBAL } from "../global";

import { Usuario } from "../../models/usuario.model"

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: string

  constructor(
    public _http: HttpClient,
  ) {
    this.url = GLOBAL.url
  }

  buscarPorDPI(dpi: string): Observable<any> {
    let a = this._http.get(this.url + `usuario/dpi/` + dpi)
    return a;
  }
}
