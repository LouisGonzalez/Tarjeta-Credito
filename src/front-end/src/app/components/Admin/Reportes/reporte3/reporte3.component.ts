import { Component, OnInit } from '@angular/core';
import { TarjetaService } from '../../../../services/tarjeta/tarjeta.service'

@Component({
  selector: 'app-reporte3',
  templateUrl: './reporte3.component.html',
  styleUrls: ['./reporte3.component.css']
})
export class Reporte3Component implements OnInit {
  deshabilitadas: number = 0;
  eliminadas: number = 0;
  activas: number = 0;
  total: number = 0;

  constructor(
    private _tarjetaService: TarjetaService,
  ) { }

  ngOnInit(): void {
    this._tarjetaService.total().subscribe(response => {
      response.deshabilitadas.map(x => { this.deshabilitadas = x.cantidad })
      response.eliminadas.map(x => { this.eliminadas = x.cantidad })
      response.todas.map(x => { this.total = x.cantidad })
      this.activas = this.total - (this.deshabilitadas + this.eliminadas)
    })
  }

}
