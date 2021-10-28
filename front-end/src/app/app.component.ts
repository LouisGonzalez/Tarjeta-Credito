import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Comentario } from './models/comentario.model';
import { UsuarioService } from './services/usuario/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  usuario
  identity
  constructor(private _router: Router,
    private _usuarioService: UsuarioService) { }

  crearComentario() {
    Swal.fire({
      title: 'Que tal le parece la aplicacion?',
      text: 'Escriba su comentario',
      icon: 'info',
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
        if (result.value.length > 0) {
          let comentario = new Comentario()
          comentario.comentario = result.value
          comentario.usuario_id = this.usuario.usuario_id
          this._usuarioService.nuevoComentario(comentario).subscribe(response => {
            Swal.fire({
              title: `Su comentario se envio con exito`,
              icon: 'success',
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

  logOut() {
    localStorage.clear();
    //  this.idle.stop();
    //window//.location.reload();
    this._router.navigate(["/login"]);
    //window.location.reload();
  }
  ngDoCheck() {
    this.usuario = this._usuarioService.getIdentity();

  }
  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(this.usuario)
    //this._router.navigate(["/login"]);

  }
}
