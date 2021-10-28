import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _userService: UsuarioService
  ) { }
  canActivate() {
    let identity = this._userService.getIdentity();
    if (identity) {
      if (identity.admin)
        this._router.navigate(['/'])
      else
        this._router.navigate(['/user'])
      return false;
    } else {

      return true;
    }

  }

}
