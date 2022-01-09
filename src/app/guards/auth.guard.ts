/* eslint-disable @typescript-eslint/no-floating-promises */
import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { UsuarioService } from '../services/usuario.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private readonly usuarioService: UsuarioService,
    private readonly router: Router
  ) { }

  canActivate (): Observable<boolean> | Promise<boolean> | boolean {
    return this.usuarioService.validarToken()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigateByUrl('/login')
          }
        })
      )
  }
}
