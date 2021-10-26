import { Component, OnInit } from '@angular/core';
import { TarjetaService } from '../../../../services/tarjeta/tarjeta.service'
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reporte1',
  templateUrl: './reporte1.component.html',
  styleUrls: ['./reporte1.component.css']
})
export class Reporte1Component implements OnInit {
  model: NgbDateStruct;
  movimientos: []
  constructor(
    private _tarjetaService: TarjetaService,
  ) { }

  listarMovimientos() {
    let f = this.model.year + '-' + this.model.month + '-' + this.model.day
    this._tarjetaService.movimientos(f).subscribe(response => {
      console.log(response)
      this.movimientos = response.movimentos
      console.log(this.movimientos)
    })
  }

  ngOnInit(): void {

  }

}
