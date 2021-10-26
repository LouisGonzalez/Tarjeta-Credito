import { Component, OnInit } from '@angular/core';
import { TarjetaService } from '../../../services/tarjeta/tarjeta.service'
import { Tarjeta } from '../../../models/tarjeta.model'
import { Deshabilitacion } from '../../../models/deshabilitacion.model'
import Swal from "sweetalert2"
import { Eliminacion } from 'src/app/models/eliminacion.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  dataSource: Tarjeta[]
  deshabilitardata: Deshabilitacion
  eliminardata: Eliminacion
  constructor(
    private tarjetaService: TarjetaService,
  ) {
    this.deshabilitardata = new Deshabilitacion()
    this.eliminardata = new Eliminacion()
  }
  habilitar(tarjeta_id: number) {
    this.tarjetaService.habilitar(tarjeta_id).subscribe(response => {
      Swal.fire({
        title: 'Cuenta habilitada',
        icon: 'success'
      })
      this.ngOnInit()
    })

  }

  deshabilitar(tarjeta_id: number) {
    Swal.fire({
      title: '¿Quiere deshabilitar esta cuenta?',
      text: 'Escriba el motivo',
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
      console.log(result)
      if (result.isConfirmed) {
        if (result.value.length < 1) {
          Swal.fire({
            title: `Por favor escriba el motivo de la deshabilitacion`,
            icon: 'warning',
          })
        } else {
          console.log('response')
          this.deshabilitardata.tarjeta_id = tarjeta_id
          this.deshabilitardata.motivo = result.value
          this.tarjetaService.deshabilitar(this.deshabilitardata).subscribe(response => {
            Swal.fire({
              title: `La cuenta se ha deshabilitado`,
              icon: 'success',
            })
            this.ngOnInit()
          })
        }
      }
    })
  }
  eliminar(tarjeta_id: number) {
    Swal.fire({
      title: '¿Quiere eliminar esta cuenta? ESTA ACCION NO SE PUEDE REVERTIR',
      text: 'Escriba el motivo',
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
        if (result.value.length < 1) {
          Swal.fire({
            title: `Por favor escriba el motivo de la eliminacion`,
            icon: 'warning',
          })
        } else {
          this.eliminardata.tarjeta_id = tarjeta_id
          this.eliminardata.motivo = result.value
          this.tarjetaService.eliminar(this.eliminardata).subscribe(response => {
            Swal.fire({
              title: `La cuenta se ha eliminado`,
              icon: 'success',
            })
            this.ngOnInit()
          })
        }
      }
    })
  }

  ngOnInit(): void {
    this.tarjetaService.listarTarjetas().subscribe(response => {
      console.log(response)
      this.dataSource = response.tarjeta
    })
  }

}
