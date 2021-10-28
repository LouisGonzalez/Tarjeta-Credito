import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { GLOBAL } from "../global";

import { Usuario } from "../../models/usuario.model"
import { Comentario } from 'src/app/models/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: string
  userSesion;
  public usuario = null;

  constructor(public _http: HttpClient) {
    this.userSesion = false;
    this.url = GLOBAL.url;
  }
  setUserSesion(val: boolean) {
    this.userSesion = val;
  }
  getIdentity() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario != "undefined") {
      this.usuario = usuario;
    } else {
      this.usuario = null;
    }
    return this.usuario;
  }
  buscarPorDPI(dpi: string): Observable<any> {
    let a = this._http.get(this.url + `usuario/dpi/` + dpi)
    return a;
  }

  nuevoComentario(comentario: Comentario): Observable<any> {
    let a = this._http.post(this.url + `comentario`, comentario)
    return a;
  }
  listarComentarios(): Observable<any> {
    let a = this._http.get(this.url + `comentario`)
    return a;
  }

  login(username: string, password: string): Observable<any> {
    let body = { username: username, password: password }
    let a = this._http.post(this.url + `usuario/login`, body)
    return a;
  }
  recordarPin(username: string): Observable<any> {
    let body = { username: username }
    let a = this._http.post(this.url + `usuario/enviar-pin`, body)
    return a;
  }
}
