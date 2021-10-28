import { Component, OnInit } from '@angular/core';
import { TarjetaService } from '../../../../services/tarjeta/tarjeta.service'


@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.component.html',
  styleUrls: ['./reporte2.component.css']
})
export class Reporte2Component implements OnInit {

  dataSource: []

  constructor(
    private _tarjetaService: TarjetaService,
  ) { }

  ngOnInit(): void {
    this._tarjetaService.bloqueadas().subscribe(response => {
      this.dataSource = response.tarjeta
      console.log(this.dataSource)
    })
  }

}
