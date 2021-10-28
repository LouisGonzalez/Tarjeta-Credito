import { Component, OnInit } from '@angular/core';
import { TarjetaService } from '../../../../services/tarjeta/tarjeta.service'
import { Tarjeta } from '../../../../models/tarjeta.model'

@Component({
  selector: 'app-reporte4',
  templateUrl: './reporte4.component.html',
  styleUrls: ['./reporte4.component.css']
})
export class Reporte4Component implements OnInit {
  numero: string = ''
  tarjetaEncontrada: Tarjeta
  saldo: number = 0
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
  ngOnInit(): void {
  }

}
