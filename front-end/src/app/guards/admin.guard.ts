import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _userService: UsuarioService
  ) { }

  canActivate() {
    let identity = this._userService.getIdentity();

    if (identity.admin) {
      return true
    } else {
      this._router.navigate(['/user'])
      return false
    }
  }

}
