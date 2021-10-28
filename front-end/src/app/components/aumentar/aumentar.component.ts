import { Component, OnInit } from '@angular/core';
import { TarjetaService } from '../../services/tarjeta/tarjeta.service'
import { Tarjeta, Transaccions } from '../../models/tarjeta.model'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aumentar',
  templateUrl: './aumentar.component.html',
  styleUrls: ['./aumentar.component.css']
})
export class AumentarComponent implements OnInit {
  numero: string = ''
  tarjetaEncontrada: Tarjeta
  saldo: number = 0
  valorAumentar: number = 0
  constructor(
    private _tarjetaService: TarjetaService
  ) {
    this.tarjetaEncontrada = new Tarjeta()
  }
  buscarTarjeta() {
    this.saldo = 0
    this._tarjetaService.buscar(this.numero).subscribe(response => {
      console.log(response)
      this.tarjetaEncontrada = response.tarjeta

      this.tarjetaEncontrada.Transaccions.map(x => {
        if (x.es_Aumento)
          this.saldo += x.monto
        else
          this.saldo -= x.monto
      })
    })
  }
  aumentarSaldo(tarjeta: Tarjeta) {
    Swal.fire({
      title: 'Reducir saldo de la cuenta',
      text: 'Ingrese la cantidad, debe ser menor a: ' + (tarjeta.limite - this.saldo),
      icon: 'info',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#124bef',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        if (Number(result.value) <= (tarjeta.limite - this.saldo) && Number(result.value) > 0) {
          let transaccion = new Transaccions()
          transaccion.es_Aumento = true
          transaccion.monto = Number(result.value)
          transaccion.tarjeta_id = tarjeta.tarjeta_id
          //this.cargando = true
          this._tarjetaService.crearTransaccion(transaccion).subscribe(response => {
            console.log(response)
            Swal.fire({
              title: `Valor modificado con exito`,
              icon: 'success',
            })

            window.location.reload()
          })
        } else {
          Swal.fire({
            title: `Por favor ingrese una cantidad valida`,
            icon: 'warning',
          })
        }
      }
    })
  }
  actualizarSaldos() {
    this._tarjetaService.actualizarSaldos().subscribe(response => {
      console.log(response.success)
    })
  }
  ngOnInit(): void {
  }

}
