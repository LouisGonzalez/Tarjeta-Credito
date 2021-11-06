import { Component, OnInit } from '@angular/core';
import { Tarjeta } from 'src/app/models/tarjeta.model';
import { TarjetaService } from 'src/app/services/tarjeta/tarjeta.service';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  public dataSource: Tarjeta[]
  constructor(
    private _tarjetaService: TarjetaService,
  ) { }

  ngOnInit(): void {
    //localStorage.getItem("usuario");
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    this._tarjetaService.buscarTarjetas(usuario.usuario_id).subscribe(response => {
      console.log(response)
      this.dataSource = response.tarjeta
    })
  }

}
