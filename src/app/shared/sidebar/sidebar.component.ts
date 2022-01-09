import { Component } from '@angular/core'
import { SidebarService } from '../../services/sidebar.service'
import { UsuarioService } from '../../services/usuario.service'
import { Usuario } from '../../models/usuario.model'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent {
  public usuario!: Usuario
  public menuItems: any[] = []

  constructor (
    private readonly sidebarService: SidebarService,
    private readonly usuarioService: UsuarioService
  ) {
    this.menuItems = this.sidebarService.menu
    this.usuario = this.usuarioService.usuario
  }

  logout (): void {
    this.usuarioService.logout()
  }
}
