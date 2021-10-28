import { Component, OnInit } from '@angular/core';
import { TarjetaService } from '../../../services/tarjeta/tarjeta.service'
import { Tarjeta, Transaccions } from '../../../models/tarjeta.model'
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
  cargando: Boolean = false
  actualizandoSaldos: Boolean = false
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
      confirmButtonColor: '#124bef',
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
      confirmButtonColor: '#124bef',
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
  reducirSaldo(tarjeta: Tarjeta) {
    Swal.fire({
      title: 'Reducir saldo de la cuenta',
      text: 'Ingrese la cantidad, debe ser menor a: ' + tarjeta.saldo,
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
        if (Number(result.value) <= tarjeta.saldo && Number(result.value) > 0) {
          let transaccion = new Transaccions()
          transaccion.es_Aumento = false
          transaccion.monto = Number(result.value)
          transaccion.tarjeta_id = tarjeta.tarjeta_id
          //this.cargando = true
          this.tarjetaService.crearTransaccion(transaccion).subscribe(response => {
            console.log(response)
            Swal.fire({
              title: `Valor modificado con exito`,
              icon: 'success',
            })
            /*this.dataSource = this.dataSource.filter(x => {
              if (x.tarjeta_id == tarjeta.tarjeta_id) {
                x.saldo -= Number(result.value)
              }
              return x

            })*/
            this.ngOnInit()
            //window.location.reload()
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
    /*this.tarjetaService.actualizarSaldos().subscribe(response => {
      console.log(response.success)
      this.actualizandoSaldos = false
    })*/
    this.tarjetaService.listarTarjetas().subscribe(response => {
      console.log(response)
      this.dataSource = response.tarjeta
      this.cargando = false
    })

  }

}
