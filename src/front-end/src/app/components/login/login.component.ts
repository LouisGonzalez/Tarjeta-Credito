import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = ""
  password: string = ""
  comentarios
  enviandoPin: Boolean = false

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

        this._router.navigate(["/login"]);

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
        Swal.fire({
          title: errorMessage.error.error,
          icon: 'warning',
        })
        if (errorMessage != null) {
          //this.status = "error";
          //this.cargando = false;
        }
      }
    );
  }
  recordarPin() {
    Swal.fire({
      title: 'Ha olvidado su PIN?',
      text: 'Escriba su usuario o correo electronico',
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
        if (result.value.length > 0) {
          this.enviandoPin = true
          this._usuarioService.recordarPin(result.value).subscribe(response => {
            console.log(response)
            Swal.fire({
              title: response.success,
              icon: 'success',

              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#124bef',
            })
            this.enviandoPin = false
          }, error => {
            Swal.fire({
              title: error.error.error,
              icon: 'error',

              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#124bef',
            })
          })
        } else {
          Swal.fire({
            title: `Por favor ingrese algo`,
            icon: 'warning',
          })
        }
      }
    })
  }

  ngOnInit(): void {
    this._usuarioService.listarComentarios().subscribe(response => {
      this.comentarios = response.comentario
      console.log(response)
    })

  }

}
