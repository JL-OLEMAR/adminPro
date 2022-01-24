import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { UsuarioService } from '../services/usuario.service'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor (
    private readonly _usuarioService: UsuarioService,
    private readonly _router: Router
  ) {}

  canActivate (): boolean | Promise<boolean> {
    if (this._usuarioService.role === 'ADMIN_ROLE') {
      return true
    } else {
      return this._router.navigateByUrl('/dashboard')
    }
  }
}
