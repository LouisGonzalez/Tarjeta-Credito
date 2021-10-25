import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model'
import { TipoCuenta } from '../../../models/tipo_cuenta.model'
import { Tarjeta, CrearTarjeta } from '../../../models/tarjeta.model'

import { TipoService } from '../../../services/tipo/tipo.service'
import { UsuarioService } from '../../../services/usuario/usuario.service'
import { TarjetaService } from '../../../services/tarjeta/tarjeta.service'

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {
  selectTipo: TipoCuenta[]
  tipo: TipoCuenta
  usuarioEncontrado: Usuario
  dpi: string = ''
  limite: number = null
  notifyme: boolean = false

  nuevaTarjeta: CrearTarjeta

  constructor(
    private _tipoService: TipoService,
    private _usuarioService: UsuarioService,
    private _tarjetaService: TarjetaService,
  ) {
    this.usuarioEncontrado = new Usuario()
    this.tipo = new TipoCuenta()
    this.nuevaTarjeta = new CrearTarjeta()
  }
  onChangeTipo(tipo_id: string) {
    console.log(tipo_id)
    console.log(this.selectTipo)
    this.selectTipo.filter(x => {
      if (x.nombre == tipo_id) {
        console.log(x)
        this.tipo = x
        this.limite = x.limite_default
      }
    })
  }

  buscarUsuario() {
    this._usuarioService.buscarPorDPI(this.dpi).subscribe(response => {
      console.log(response)
      this.usuarioEncontrado = response.usuario
    })
  }

  crearTarjeta() {
    this.nuevaTarjeta = {
      numero_tarjeta: '1111111111',
      cvv: '123',
      fecha_vencimiento: '2025-10-23',
      notifyme: this.notifyme,
      limite: this.limite,
      saldo: 0,
      usuario_id: this.usuarioEncontrado.usuario_id,
      tipo_cuenta_id: this.tipo.tipo_cuenta_id,
    }
    this._tarjetaService.crearTarjeta(this.nuevaTarjeta).subscribe(response => {
      console.log(response)
    })
  }

  ngOnInit(): void {
    this._tipoService.listarTipos().subscribe(response => {
      this.selectTipo = response.tipo_cuenta
      console.log(this.selectTipo)
    })
  }

}
