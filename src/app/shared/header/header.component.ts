import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { Usuario } from '../../models/usuario.model'
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent {
  public usuario!: Usuario

  constructor (
    private readonly usuarioService: UsuarioService,
    private readonly _router: Router
  ) { this.usuario = this.usuarioService.usuario }

  logout (): void {
    this.usuarioService.logout()
  }

  async search (termino: string): Promise<void> {
    if (termino.length === 0) { return }

    await this._router.navigateByUrl(`/dashboard/search/${termino}`)
  }
}
