import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model'
import { TipoCuenta } from '../../../models/tipo_cuenta.model'
import { Tarjeta, CrearTarjeta } from '../../../models/tarjeta.model'
import { Router } from '@angular/router';

import { TipoService } from '../../../services/tipo/tipo.service'
import { UsuarioService } from '../../../services/usuario/usuario.service'
import { TarjetaService } from '../../../services/tarjeta/tarjeta.service'
import Swal from 'sweetalert2';

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
    private _router: Router,
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

  convertir(numero: number, digitos: number) {
    let Old = numero.toString()
    let New = ''
    for (let x = 0; x < digitos - Old.length; x++) {
      New = New + '0'
    }
    New = New + Old
    return New
  }

  crearTarjeta() {
    this._tarjetaService.generarDatos().subscribe(response => {
      let cvv = response.datos.cvv
      let noTarjetaNumber = Number(response.datos.numero_tarjeta) + 1
      /*let noCuentaNew = ''
      for (let x = 0; x < 4 - noCuentaOld.length; x++) {
        noCuentaNew = noCuentaNew + '0'
      }
      noCuentaNew = noCuentaNew + noCuentaOld*/
      let noCuenta = this.convertir(noTarjetaNumber, 4)
      let id = this.convertir(this.usuarioEncontrado.usuario_id, 2)

      let noTarjeta = this.tipo.tipo_cuenta_id.toString() + noCuenta + id + '89' + Math.trunc(Math.random() * (9 - 0) + 0)
      console.log(noTarjeta)

      let fecha = new Date
      fecha.setFullYear(fecha.getFullYear() + 5)

      this.nuevaTarjeta = {
        numero_tarjeta: noTarjeta,
        cvv: cvv,
        fecha_vencimiento: fecha,
        notifyme: this.notifyme,
        limite: this.limite,
        saldo: 0,
        usuario_id: this.usuarioEncontrado.usuario_id,
        tipo_cuenta_id: this.tipo.tipo_cuenta_id,
      }

      Swal.fire({
        title: 'Desea crear una tarjeta con los siguientes datos?',
        text: 'Numero: ' + this.nuevaTarjeta.numero_tarjeta + ', CVV: ' + cvv + ', Fecha de vencimiento: ' + fecha.getDay().toString() + '/' + fecha.getMonth().toString() + '/' + fecha.getFullYear().toString(),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#124bef',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          this._tarjetaService.crearTarjeta(this.nuevaTarjeta).subscribe(response => {
            console.log(response)
            this._router.navigate(['/']);
          })
        }
      })
      console.log(this.nuevaTarjeta)

    })

    /*this._tarjetaService.crearTarjeta(this.nuevaTarjeta).subscribe(response => {
      console.log(response)
    })*/
  }

  ngOnInit(): void {
    this._tipoService.listarTipos().subscribe(response => {
      this.selectTipo = response.tipo_cuenta
      console.log(this.selectTipo)
    })
  }

}
