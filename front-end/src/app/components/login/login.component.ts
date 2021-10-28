import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = ""
  password: string = ""
  comentarios

  public identity;
  public token;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router,
  ) { }
  login() {
    this._usuarioService.login(this.username, this.password).subscribe(response => {
      this.token = response.success;
      this.identity = response.usuario;
      if (this.token.length <= 0) {
        //this.status = "error";
        this._router.navigate(["/login"]);
        //this.cargando = false;
      } else {
        console.log(this.token)
        console.log(this.identity)
        //this.status = "success";
        localStorage.setItem("token", this.token);
        localStorage.setItem("usuario", JSON.stringify(this.identity));
        this._usuarioService.setUserSesion(true);
        let usuario = this._usuarioService.getIdentity()
        //actualizando los medicamentos que estan vencidos

        if (usuario.admin) {
          this._router.navigate(["/"]);
          //window.location.reload();
        } else {
          this._router.navigate(["/user"]);
          // window.location.reload();
        }


      }
    },
      (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          //this.status = "error";
          //this.cargando = false;
        }
      }
    );
  }

  ngOnInit(): void {
    this._usuarioService.listarComentarios().subscribe(response => {
      this.comentarios = response.comentario
      console.log(response)
    })

  }

}
