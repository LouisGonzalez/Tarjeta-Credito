import { Component, OnInit } from '@angular/core';
import { TipoService } from '../../../services/tipo/tipo.service'
import { Moneda } from 'src/app/models/moneda.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-moneda',
  templateUrl: './crud-moneda.component.html',
  styleUrls: ['./crud-moneda.component.css']
})
export class CrudMonedaComponent implements OnInit {
  dataSource: Moneda[]
  constructor(
    private _tipoService: TipoService,
  ) { }

  modificarCambio(moneda: Moneda) {
    Swal.fire({
      title: 'Ingrese nuevo valor de cambio',
      //text: 'Escriba el motivo',
      icon: 'warning',
      input: 'textarea',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#d33',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        if (Number(result.value) >= 1) {
          moneda.cambio_quetzales = Number(result.value)
          this._tipoService.actualizarMoneda(moneda, moneda.moneda_id).subscribe(response => {
            Swal.fire({
              title: `Valor modificado con exito`,
              icon: 'success',
            })
            this.ngOnInit()
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

  ngOnInit(): void {
    this._tipoService.listarMonedas().subscribe(response => {
      this.dataSource = response.moneda
    })
  }

}
