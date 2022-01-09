import { Component } from '@angular/core'
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent {
  constructor (private readonly usuarioService: UsuarioService) { }

  logout (): void {
    this.usuarioService.logout()
  }
}
