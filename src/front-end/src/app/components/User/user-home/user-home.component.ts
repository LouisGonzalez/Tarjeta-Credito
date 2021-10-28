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
    this._tarjetaService.buscarTarjetas(2).subscribe(response => {
      console.log(response)
      this.dataSource = response.tarjeta
    })
  }

}
