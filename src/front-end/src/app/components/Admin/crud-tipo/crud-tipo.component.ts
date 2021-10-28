import { Component, OnInit } from '@angular/core';
import { TipoCuenta } from 'src/app/models/tipo_cuenta.model';
import { TipoService } from 'src/app/services/tipo/tipo.service';


@Component({
  selector: 'app-crud-tipo',
  templateUrl: './crud-tipo.component.html',
  styleUrls: ['./crud-tipo.component.css']
})

export class CrudTipoComponent implements OnInit {
  dataSource: TipoCuenta[]
  constructor(
    private _tipoService: TipoService
  ) { }

  ngOnInit(): void {
    this._tipoService.listarTipos().subscribe(response => {
      console.log(response)
      this.dataSource = response.tipo_cuenta
    })
  }

}
