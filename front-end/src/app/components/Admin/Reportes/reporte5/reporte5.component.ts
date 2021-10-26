import { Component, OnInit } from '@angular/core';
import { TarjetaService } from '../../../../services/tarjeta/tarjeta.service'

@Component({
  selector: 'app-reporte5',
  templateUrl: './reporte5.component.html',
  styleUrls: ['./reporte5.component.css']
})
export class Reporte5Component implements OnInit {
  gold: any = {
    aumento: 0,
    reduccion: 0,
    cambio: 0
  }

  normal: any = {
    aumentoQ: 0,
    reduccionQ: 0
  }


  constructor(
    private _tarjetaService: TarjetaService
  ) { }

  ngOnInit(): void {
    console.log(this.normal)
    this._tarjetaService.cierre().subscribe(response => {
      response.aumentos.map(x => {
        if (x.moneda_id == 1)
          this.normal.aumentoQ = x.cantidad
        else {
          this.gold.aumento = x.cantidad
          this.gold.cambio = x.cambio_quetzales
        }
      })
      console.log(this.gold.aumento * this.gold.cambio)
      this.normal.reduccionQ = response.reducciones.cantidad
      response.reducciones.map(x => {
        if (x.moneda_id == 1)
          this.normal.reduccionQ = x.cantidad
        else {
          this.gold.reduccion = x.cantidad
        }
      })
    })

  }

}
